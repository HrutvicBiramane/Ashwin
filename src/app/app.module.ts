import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Main App Component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Shared Components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

// Services
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';

// HTTP Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

/**
 * FreshCart App Module
 * 
 * This module bootstraps the entire grocery shopping application with:
 * - All page components for customer and admin functionality
 * - Shared components for reusable UI elements
 * - Services for business logic and API communication
 * - HTTP interceptors for JWT token management
 * - Route guards for authentication and authorization
 * - Form handling with validation
 * 
 * Features:
 * - Complete grocery shopping experience
 * - User authentication and authorization
 * - Shopping cart and checkout process
 * - Product catalog with search and filtering
 * - Order management system
 * - Admin dashboard for management
 * - Responsive design with professional UI
 */
@NgModule({
  declarations: [
    // Main App Component
    AppComponent,
    
    // Page Components
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    OrdersComponent,
    OrderDetailComponent,
    AdminDashboardComponent,
    NotFoundComponent,
    
    // Shared Components
    ProductCardComponent,
    CartItemComponent,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    PaginationComponent,
    StarRatingComponent
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    FormsModule,              // For template-driven forms
    ReactiveFormsModule,      // For reactive forms with validation
    HttpClientModule,         // For API communication
    RouterModule,             // For routing
    
    // App Routing
    AppRoutingModule
  ],
  providers: [
    // Core Services
    AuthService,
    ProductService,
    CartService,
    OrderService,
    UserService,
    NotificationService,
    
    // Route Guards
    AuthGuard,
    AdminGuard,
    
    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    console.log('🛒 FreshCart Application Initialized');
    console.log('✅ All modules and services loaded successfully');
    console.log('🔒 Security measures active');
    console.log('📱 Responsive design enabled');
  }
}