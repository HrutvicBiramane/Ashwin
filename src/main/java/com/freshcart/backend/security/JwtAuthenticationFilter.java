package com.freshcart.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT Authentication Filter for processing JWT tokens in HTTP requests
 * 
 * This filter:
 * - Extracts JWT tokens from Authorization header
 * - Validates token format and signature
 * - Loads user details from database
 * - Sets authentication context for the request
 * 
 * Security features:
 * - Bearer token validation
 * - Proper error handling without exposing sensitive information
 * - Context clearing on invalid tokens
 * 
 * @author FreshCart Development Team
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String AUTHORIZATION_HEADER = "Authorization";

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            String jwt = extractJwtFromRequest(request);
            
            if (jwt != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                authenticateUser(request, jwt);
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Extract JWT token from Authorization header
     * 
     * @param request HTTP request
     * @return JWT token or null if not found
     */
    private String extractJwtFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader(AUTHORIZATION_HEADER);
        
        if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
            String token = authHeader.substring(BEARER_PREFIX.length());
            
            // Basic token format validation
            if (token.trim().isEmpty()) {
                log.warn("Empty JWT token in Authorization header");
                return null;
            }
            
            return token;
        }
        
        return null;
    }

    /**
     * Authenticate user based on JWT token
     * 
     * @param request HTTP request
     * @param jwt JWT token
     */
    private void authenticateUser(HttpServletRequest request, String jwt) {
        try {
            // Extract username from token
            String username = jwtUtils.extractUsername(jwt);
            
            if (username == null || username.trim().isEmpty()) {
                log.warn("Username is null or empty in JWT token");
                return;
            }

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            // Validate token against user details
            if (jwtUtils.isTokenValid(jwt, userDetails)) {
                // Create authentication token
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );
                
                // Set authentication details
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Set authentication in security context
                SecurityContextHolder.getContext().setAuthentication(authToken);
                
                log.debug("User '{}' successfully authenticated", username);
            } else {
                log.warn("Invalid JWT token for user: {}", username);
                SecurityContextHolder.clearContext();
            }
            
        } catch (Exception e) {
            log.error("Error during JWT authentication: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }
    }

    /**
     * Determine if this filter should be applied to the request
     * Skip authentication for certain paths like health checks, documentation, etc.
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        
        // Skip authentication for public endpoints
        return path.startsWith("/api/auth/") ||
               path.startsWith("/api/actuator/") ||
               path.startsWith("/api/h2-console/") ||
               path.startsWith("/api/swagger-ui/") ||
               path.startsWith("/api/v3/api-docs/") ||
               path.equals("/api/") ||
               path.equals("/api/health") ||
               path.startsWith("/api/public/");
    }
}