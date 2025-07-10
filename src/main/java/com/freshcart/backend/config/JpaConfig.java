package com.freshcart.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * JPA Configuration for FreshCart Application
 * 
 * This configuration enables:
 * - JPA Auditing for automatic timestamp management
 * - JPA Repositories with custom base repository
 * - Transaction management
 * 
 * @author FreshCart Development Team
 */
@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.freshcart.backend.repository")
@EnableTransactionManagement
public class JpaConfig {
    // JPA configuration is handled by annotations
    // Additional custom configurations can be added here if needed
}