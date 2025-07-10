import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Interface for Toast notifications
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

/**
 * Main App Component for FreshCart Grocery Shopping System
 * 
 * This component handles:
 * - Main application layout and navigation
 * - User authentication state management
 * - Global loading states and notifications
 * - Search functionality
 * - Cart management display
 * 
 * Features:
 * - Responsive navigation with user menu
 * - Toast notification system
 * - Loading overlay for better UX
 * - Role-based menu items (Admin/Customer)
 * - Shopping cart indicator
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // App properties
  title = 'FreshCart - Your Online Grocery Store';
  
  // Search functionality
  searchQuery: string = '';
  
  // User authentication state
  isLoggedIn: boolean = false;
  userName: string = '';
  isAdmin: boolean = false;
  
  // Shopping cart
  cartItemCount: number = 0;
  
  // UI state management
  isLoading: boolean = false;
  toasts: Toast[] = [];
  private toastCounter: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize app state
    this.checkAuthenticationStatus();
    this.loadCartItemCount();
    this.setupEventListeners();
  }

  /**
   * Check if user is authenticated and load user data
   */
  checkAuthenticationStatus(): void {
    // Check localStorage for JWT token
    const token = localStorage.getItem('freshcart_token');
    const userData = localStorage.getItem('freshcart_user');
    
    if (token && userData) {
      this.isLoggedIn = true;
      const user = JSON.parse(userData);
      this.userName = user.firstName || user.username || 'User';
      this.isAdmin = user.role === 'ADMIN';
    } else {
      this.isLoggedIn = false;
      this.userName = '';
      this.isAdmin = false;
    }
  }

  /**
   * Load shopping cart item count
   */
  loadCartItemCount(): void {
    // Get cart from localStorage or initialize empty
    const cart = JSON.parse(localStorage.getItem('freshcart_cart') || '[]');
    this.cartItemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  /**
   * Setup event listeners for cart updates and authentication changes
   */
  setupEventListeners(): void {
    // Listen for storage changes (cart updates from other tabs)
    window.addEventListener('storage', (event) => {
      if (event.key === 'freshcart_cart') {
        this.loadCartItemCount();
      }
      if (event.key === 'freshcart_token' || event.key === 'freshcart_user') {
        this.checkAuthenticationStatus();
      }
    });

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', () => {
      this.loadCartItemCount();
    });

    // Listen for authentication events
    window.addEventListener('userLoggedIn', () => {
      this.checkAuthenticationStatus();
    });

    window.addEventListener('userLoggedOut', () => {
      this.checkAuthenticationStatus();
      this.cartItemCount = 0;
    });
  }

  /**
   * Handle search functionality
   */
  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
      this.router.navigate(['/products'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    }
  }

  /**
   * Handle user logout
   */
  logout(): void {
    // Show loading
    this.setLoading(true);
    
    // Clear authentication data
    localStorage.removeItem('freshcart_token');
    localStorage.removeItem('freshcart_refresh_token');
    localStorage.removeItem('freshcart_user');
    localStorage.removeItem('freshcart_cart');
    
    // Update state
    this.isLoggedIn = false;
    this.userName = '';
    this.isAdmin = false;
    this.cartItemCount = 0;
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
    
    // Show success message
    this.showToast('Successfully logged out!', 'success');
    
    // Redirect to home
    this.router.navigate(['/']);
    
    // Hide loading
    setTimeout(() => {
      this.setLoading(false);
    }, 500);
  }

  /**
   * Set global loading state
   */
  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  /**
   * Show toast notification
   */
  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    const toast: Toast = {
      id: ++this.toastCounter,
      message,
      type
    };
    
    this.toasts.push(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      this.removeToast(toast);
    }, 5000);
  }

  /**
   * Remove toast notification
   */
  removeToast(toast: Toast): void {
    const index = this.toasts.findIndex(t => t.id === toast.id);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }

  /**
   * Update cart count (called by cart service)
   */
  updateCartCount(count: number): void {
    this.cartItemCount = count;
  }

  /**
   * Handle navigation errors
   */
  onNavigationError(error: any): void {
    console.error('Navigation error:', error);
    this.showToast('Navigation error occurred', 'error');
  }

  /**
   * Check if current route is active
   */
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  /**
   * Handle mobile menu toggle
   */
  toggleMobileMenu(): void {
    // Implementation for mobile menu toggle
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.classList.toggle('mobile-active');
    }
  }
}