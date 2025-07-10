package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

/**
 * User Entity representing system users (customers and admins)
 * 
 * This entity implements UserDetails for Spring Security integration
 * and includes comprehensive validation and security features.
 * 
 * Features:
 * - Encrypted password storage
 * - Role-based access control
 * - Account status management
 * - Audit trail with creation and update timestamps
 * - Email verification system
 * - Account locking mechanism
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "users", 
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "email"),
           @UniqueConstraint(columnNames = "username")
       },
       indexes = {
           @Index(name = "idx_user_email", columnList = "email"),
           @Index(name = "idx_user_username", columnList = "username"),
           @Index(name = "idx_user_role", columnList = "role")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@ToString(exclude = {"password", "orders", "cartItems"})
public class User extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,50}$", 
             message = "Username can only contain letters, numbers, dots, underscores, and hyphens")
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "First name can only contain letters and spaces")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Last name can only contain letters and spaces")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Please provide a valid phone number")
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private Role role = Role.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private AccountStatus status = AccountStatus.ACTIVE;

    @Builder.Default
    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "email_verification_token")
    private String emailVerificationToken;

    @Column(name = "email_verification_expires_at")
    private LocalDateTime emailVerificationExpiresAt;

    @Column(name = "password_reset_token")
    private String passwordResetToken;

    @Column(name = "password_reset_expires_at")
    private LocalDateTime passwordResetExpiresAt;

    @Builder.Default
    @Column(name = "failed_login_attempts", nullable = false)
    private Integer failedLoginAttempts = 0;

    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "last_password_change_at")
    private LocalDateTime lastPasswordChangeAt;

    // Address fields
    @Size(max = 255, message = "Address line 1 must not exceed 255 characters")
    @Column(name = "address_line_1")
    private String addressLine1;

    @Size(max = 255, message = "Address line 2 must not exceed 255 characters")
    @Column(name = "address_line_2")
    private String addressLine2;

    @Size(max = 100, message = "City must not exceed 100 characters")
    @Column(name = "city")
    private String city;

    @Size(max = 100, message = "State must not exceed 100 characters")
    @Column(name = "state")
    private String state;

    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Please provide a valid postal code")
    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @Size(max = 100, message = "Country must not exceed 100 characters")
    @Column(name = "country")
    private String country;

    // User preferences
    @Builder.Default
    @Column(name = "newsletter_subscribed", nullable = false)
    private Boolean newsletterSubscribed = false;

    @Builder.Default
    @Column(name = "marketing_emails_enabled", nullable = false)
    private Boolean marketingEmailsEnabled = true;

    @Builder.Default
    @Column(name = "order_notifications_enabled", nullable = false)
    private Boolean orderNotificationsEnabled = true;

    // Relationships
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Order> orders = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CartItem> cartItems = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Review> reviews = new HashSet<>();

    // UserDetails implementation methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return status != AccountStatus.EXPIRED;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status != AccountStatus.LOCKED && 
               (lockedUntil == null || LocalDateTime.now().isAfter(lockedUntil));
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Consider credentials expired if password hasn't been changed in 90 days
        if (lastPasswordChangeAt == null) {
            return true; // New account
        }
        return LocalDateTime.now().isBefore(lastPasswordChangeAt.plusDays(90));
    }

    @Override
    public boolean isEnabled() {
        return status == AccountStatus.ACTIVE && emailVerified;
    }

    // Utility methods
    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getDisplayName() {
        return getFullName();
    }

    public boolean isAdmin() {
        return role == Role.ADMIN;
    }

    public boolean isCustomer() {
        return role == Role.CUSTOMER;
    }

    public void incrementFailedLoginAttempts() {
        this.failedLoginAttempts++;
        if (this.failedLoginAttempts >= 5) {
            this.lockedUntil = LocalDateTime.now().plusHours(1); // Lock for 1 hour
            this.status = AccountStatus.LOCKED;
        }
    }

    public void resetFailedLoginAttempts() {
        this.failedLoginAttempts = 0;
        this.lockedUntil = null;
        if (this.status == AccountStatus.LOCKED) {
            this.status = AccountStatus.ACTIVE;
        }
    }

    public void updateLastLogin() {
        this.lastLoginAt = LocalDateTime.now();
        resetFailedLoginAttempts();
    }

    // Enums
    public enum Role {
        CUSTOMER, ADMIN
    }

    public enum AccountStatus {
        ACTIVE, INACTIVE, LOCKED, SUSPENDED, EXPIRED
    }
}