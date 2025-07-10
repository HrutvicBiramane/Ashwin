import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Page Components (will be created)
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

// Import Guards (will be created)
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

/**
 * FreshCart Application Routing Configuration
 * 
 * This routing module defines all the routes for the grocery shopping application:
 * 
 * PUBLIC ROUTES (No authentication required):
 * - Home page with featured products
 * - Product catalog and search
 * - Individual product details
 * - User login and registration
 * 
 * PROTECTED ROUTES (Authentication required):
 * - Shopping cart management
 * - Checkout process
 * - User profile management
 * - Order history and tracking
 * 
 * ADMIN ROUTES (Admin role required):
 * - Admin dashboard with analytics
 * - Product management
 * - Order management
 * - User management
 * 
 * SECURITY FEATURES:
 * - Route guards for authentication
 * - Role-based access control
 * - Automatic redirects for unauthorized access
 */

const routes: Routes = [
  // Public Routes - No authentication required
  {
    path: '',
    component: HomeComponent,
    data: { title: 'FreshCart - Your Online Grocery Store' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products - FreshCart' }
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details - FreshCart' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login - FreshCart' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register - FreshCart' }
  },

  // Protected Routes - Authentication required
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { title: 'Shopping Cart - FreshCart' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'Checkout - FreshCart' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'My Profile - FreshCart' }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: { title: 'My Orders - FreshCart' }
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'Order Details - FreshCart' }
  },

  // Admin Routes - Admin role required
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: { title: 'Admin Dashboard - FreshCart' }
  },

  // Catch-all route for 404 pages
  {
    path: '404',
    component: NotFoundComponent,
    data: { title: 'Page Not Found - FreshCart' }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Enable router tracing for debugging (disable in production)
    enableTracing: false,
    
    // Scroll to top on route change
    scrollPositionRestoration: 'top',
    
    // Preload lazy-loaded modules
    preloadingStrategy: undefined,
    
    // Use hash location strategy if needed for hosting
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor() {
    console.log('🛣️ FreshCart routing configured');
    console.log('🔒 Route guards active for security');
    console.log('📄 All page routes defined');
  }
}