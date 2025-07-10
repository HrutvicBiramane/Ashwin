# 🍃 FreshCart Backend - Spring Boot API

A robust and secure Spring Boot backend for the FreshCart grocery shopping system, featuring JWT authentication, H2 database, comprehensive validation, and modern architecture.

## 🏗️ Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 21
- **Database**: H2 (In-memory)
- **Security**: Spring Security + JWT
- **Documentation**: Swagger/OpenAPI 3
- **Build Tool**: Maven
- **Testing**: JUnit 5, Mockito

## 🚀 Quick Start

### Prerequisites
- Java 21 or higher
- Maven 3.6+

### Running the Application

1. **Clone and navigate to backend directory**
```bash
git clone <repository-url>
cd freshcart-app/freshcart-backend
```

2. **Install dependencies and run**
```bash
mvn clean install
mvn spring-boot:run
```

3. **Access the application**
- API Base URL: `http://localhost:8080/api`
- H2 Console: `http://localhost:8080/api/h2-console`
- Swagger UI: `http://localhost:8080/api/swagger-ui/index.html`
- Health Check: `http://localhost:8080/api/actuator/health`

## 🗄️ Database Configuration

### H2 Database Console Access
- **URL**: `http://localhost:8080/api/h2-console`
- **JDBC URL**: `jdbc:h2:mem:freshcart`
- **Username**: `sa`
- **Password**: `freshcart2024`

### Default Admin User
On application startup, a default admin user is created:
- **Username**: `admin`
- **Email**: `admin@freshcart.com`
- **Password**: `Admin123!`

## 🔐 Security Features

### JWT Authentication
- **Algorithm**: HMAC-SHA256
- **Access Token Expiry**: 24 hours
- **Refresh Token Expiry**: 7 days
- **Secret Key**: Configurable via environment variable

### Password Security
- **BCrypt hashing** with 12 rounds
- **Password complexity requirements**
- **Account lockout** after 5 failed attempts
- **Password reset** functionality

### API Security
- **Input validation** on all endpoints
- **SQL injection protection**
- **XSS protection** 
- **CORS configuration**
- **Rate limiting** (planned)

## 📊 API Endpoints

### Authentication (`/api/auth`)
```
POST /register     - User registration
POST /login        - User login  
POST /refresh      - Refresh JWT token
POST /logout       - User logout
POST /forgot-password - Request password reset
POST /reset-password  - Reset password with token
```

### Users (`/api/users`)
```
GET  /profile      - Get current user profile
PUT  /profile      - Update user profile
GET  /{id}         - Get user by ID (Admin only)
GET  /             - List all users (Admin only)
DELETE /{id}       - Delete user (Admin only)
```

### Products (`/api/products`)
```
GET  /             - List products (paginated)
GET  /{id}         - Get product details
POST /             - Create product (Admin only)
PUT  /{id}         - Update product (Admin only)
DELETE /{id}       - Delete product (Admin only)
GET  /search       - Search products
GET  /featured     - Get featured products
```

### Categories (`/api/categories`)
```
GET  /             - List all categories
GET  /{id}         - Get category by ID
POST /             - Create category (Admin only)
PUT  /{id}         - Update category (Admin only)
DELETE /{id}       - Delete category (Admin only)
```

### Shopping Cart (`/api/cart`)
```
GET  /             - Get user's cart
POST /items        - Add item to cart
PUT  /items/{id}   - Update cart item quantity
DELETE /items/{id} - Remove item from cart
DELETE /           - Clear entire cart
```

### Orders (`/api/orders`)
```
GET  /             - List user's orders
GET  /{id}         - Get order details
POST /             - Create new order
PUT  /{id}/cancel  - Cancel order
GET  /admin/all    - List all orders (Admin only)
PUT  /{id}/status  - Update order status (Admin only)
```

### Reviews (`/api/reviews`)
```
GET  /product/{productId} - Get product reviews
POST /product/{productId} - Add product review
PUT  /{id}               - Update review
DELETE /{id}             - Delete review
GET  /admin/pending      - Get pending reviews (Admin only)
PUT  /{id}/approve       - Approve review (Admin only)
```

## 🏗️ Project Structure

```
src/main/java/com/freshcart/backend/
├── 📁 entity/          # JPA Entities
│   ├── User.java
│   ├── Product.java
│   ├── Category.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── CartItem.java
│   └── Review.java
│
├── 📁 repository/      # JPA Repositories
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   └── ...
│
├── 📁 service/         # Business Logic
│   ├── UserService.java
│   ├── ProductService.java
│   └── ...
│
├── 📁 controller/      # REST Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   └── ...
│
├── 📁 dto/            # Data Transfer Objects
│   ├── request/
│   └── response/
│
├── 📁 security/       # Security Configuration
│   ├── SecurityConfig.java
│   ├── JwtUtils.java
│   └── JwtAuthenticationFilter.java
│
├── 📁 config/         # Application Configuration
│   ├── CorsConfig.java
│   └── SwaggerConfig.java
│
├── 📁 exception/      # Exception Handling
│   ├── GlobalExceptionHandler.java
│   └── custom exceptions
│
└── 📁 util/          # Utility Classes
    └── various utilities
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn test jacoco:report
```

### Test Coverage
- **Unit Tests**: Service layer testing
- **Integration Tests**: API endpoint testing
- **Security Tests**: Authentication and authorization
- **Repository Tests**: Database operations

## 🔧 Configuration

### Environment Variables
```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits

# Email Configuration (for notifications)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# File Upload
UPLOAD_DIR=./uploads
```

### Application Profiles
- **default**: Development configuration
- **dev**: Development with debug logging
- **prod**: Production optimized settings

### Key Configuration Properties
```yaml
# Database
spring.datasource.url=jdbc:h2:mem:freshcart
spring.jpa.hibernate.ddl-auto=create-drop

# Security
freshcart.security.jwt.expiration=86400000  # 24 hours
freshcart.security.jwt.refresh-expiration=604800000  # 7 days

# Business Logic
freshcart.business.tax-rate=0.08
freshcart.business.free-shipping-threshold=50.00
```

## 📈 Performance Features

### Database Optimizations
- **Proper indexing** on frequently queried fields
- **Lazy loading** for entity relationships
- **Connection pooling** with HikariCP
- **Query optimization** with JPA

### API Performance
- **Pagination** for large datasets
- **Efficient queries** with Spring Data JPA
- **Caching** for static data (planned)
- **Compression** for responses

## 🛡️ Security Implementation

### Authentication Flow
1. User provides credentials
2. Server validates and generates JWT
3. Client stores JWT securely
4. JWT included in subsequent requests
5. Server validates JWT for protected endpoints

### Authorization Levels
- **Public**: No authentication required
- **User**: Authenticated users only
- **Admin**: Admin role required

### Security Headers
- **CORS** properly configured
- **CSRF** protection enabled
- **XSS** protection headers
- **Content Security Policy**

## 📊 Monitoring & Health

### Actuator Endpoints
- `/actuator/health` - Application health
- `/actuator/info` - Application information
- `/actuator/metrics` - Application metrics
- `/actuator/env` - Environment details

### Logging
- **Structured logging** with Logback
- **Different log levels** for environments
- **Security event logging**
- **Performance logging**

## 🚀 Deployment

### JAR Deployment
```bash
# Build the JAR
mvn clean package

# Run the JAR
java -jar target/freshcart-backend-1.0.0.jar
```

### Docker Deployment
```dockerfile
FROM openjdk:21-jdk-slim
COPY target/freshcart-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Production Considerations
- Use external database (PostgreSQL/MySQL)
- Configure proper logging
- Set up monitoring and alerting
- Implement rate limiting
- Use HTTPS in production

## 🔍 Troubleshooting

### Common Issues

**H2 Console Access Issues**
- Ensure H2 console is enabled in application.yml
- Check if running in dev profile
- Verify URL: `/api/h2-console`

**JWT Token Issues**
- Check token expiration
- Verify JWT secret configuration
- Ensure proper Authorization header format

**Database Connection Issues**
- Check H2 configuration
- Verify JDBC URL format
- Ensure proper credentials

### Debug Mode
```bash
# Run with debug logging
mvn spring-boot:run -Dspring.profiles.active=dev
```

## 📚 Additional Resources

- **Spring Boot Documentation**: https://spring.io/projects/spring-boot
- **Spring Security Reference**: https://spring.io/projects/spring-security
- **H2 Database Documentation**: http://www.h2database.com/
- **JWT.io**: https://jwt.io/

## 🤝 Contributing

1. Follow Java coding conventions
2. Write comprehensive tests
3. Update documentation
4. Use meaningful commit messages
5. Ensure security best practices

## 📄 License

This project is licensed under the MIT License.

---

**Built with Spring Boot 3.2.0 and Java 21** 🍃
