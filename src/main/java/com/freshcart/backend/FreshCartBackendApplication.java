package com.freshcart.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Main Spring Boot Application class for FreshCart Backend
 * 
 * This application provides a comprehensive grocery shopping system with:
 * - User Authentication & Authorization with JWT
 * - Product Management
 * - Shopping Cart functionality
 * - Order Management
 * - Admin Dashboard
 * - H2 Database integration
 * - Security measures including encryption and hashing
 * - Input validation and error handling
 * 
 * @author FreshCart Development Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableTransactionManagement
public class FreshCartBackendApplication {

    /**
     * Main method to start the Spring Boot application
     * 
     * @param args Command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(FreshCartBackendApplication.class, args);
        System.out.println("🚀 FreshCart Backend started successfully!");
        System.out.println("📊 H2 Database Console: http://localhost:8080/h2-console");
        System.out.println("📚 API Documentation: http://localhost:8080/swagger-ui/index.html");
        System.out.println("🔍 Health Check: http://localhost:8080/actuator/health");
    }
}