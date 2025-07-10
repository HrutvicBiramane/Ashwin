package com.freshcart.backend.config;

import com.freshcart.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Spring Security Configuration for FreshCart Application
 * 
 * This configuration provides:
 * - JWT-based authentication
 * - CORS configuration for Angular frontend
 * - Password encoding with BCrypt
 * - Role-based authorization
 * - Public endpoints for authentication and documentation
 * 
 * Security Features:
 * - Stateless session management
 * - Strong password hashing
 * - Protection against common vulnerabilities
 * - Method-level security annotations
 * 
 * @author FreshCart Development Team
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;

    /**
     * Configure HTTP security with JWT authentication
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for stateless API
            .csrf(AbstractHttpConfigurer::disable)
            
            // Configure CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Configure authorization rules
            .authorizeHttpRequests(authz -> authz
                // Public endpoints - no authentication required
                .requestMatchers(
                    "/auth/**",           // Authentication endpoints
                    "/public/**",         // Public API endpoints
                    "/actuator/health",   // Health check
                    "/h2-console/**",     // H2 database console (dev only)
                    "/swagger-ui/**",     // Swagger UI
                    "/v3/api-docs/**",    // OpenAPI docs
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()
                
                // Admin-only endpoints
                .requestMatchers(
                    "/admin/**",
                    "/users/admin/**",
                    "/products/admin/**",
                    "/orders/admin/**",
                    "/categories/admin/**"
                ).hasRole("ADMIN")
                
                // User endpoints - authenticated users
                .requestMatchers(
                    "/users/profile/**",
                    "/cart/**",
                    "/orders/**",
                    "/reviews/**"
                ).hasAnyRole("USER", "CUSTOMER", "ADMIN")
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Configure session management as stateless
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Configure authentication provider
            .authenticationProvider(authenticationProvider())
            
            // Add JWT filter before username/password authentication filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            
            // Configure headers for security
            .headers(headers -> headers
                .frameOptions().sameOrigin()  // Allow H2 console in same origin
                .contentTypeOptions().and()
                .xssProtection().and()
                .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                    .includeSubdomains(true)
                    .maxAgeInSeconds(31536000)
                )
            );

        return http.build();
    }

    /**
     * Configure CORS for Angular frontend communication
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allowed origins (update for production)
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:4200",      // Angular dev server
            "http://localhost:3000",      // Alternative dev port
            "https://*.vercel.app",       // Vercel deployments
            "https://*.netlify.app",      // Netlify deployments
            "https://freshcart-*.app"     // Custom domain pattern
        ));
        
        // Allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        
        // Allowed headers
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "X-Requested-With",
            "X-CSRF-Token",
            "Cache-Control"
        ));
        
        // Exposed headers (for JWT token refresh)
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "X-New-Token"
        ));
        
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // Cache preflight requests for 1 hour
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Password encoder using BCrypt with strength 12
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    /**
     * Authentication provider using DAO authentication
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setHideUserNotFoundExceptions(false); // For better error handling
        return authProvider;
    }

    /**
     * Authentication manager for manual authentication
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}