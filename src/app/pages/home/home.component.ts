import { Component, OnInit } from '@angular/core';

/**
 * Home Component - Main Landing Page
 * 
 * This component displays:
 * - Hero section with promotional content
 * - Featured products carousel
 * - Category highlights
 * - Special offers and deals
 * - Newsletter subscription
 * - App features overview
 * 
 * Features:
 * - Responsive design for all devices
 * - Dynamic content loading
 * - Interactive product previews
 * - Call-to-action buttons
 * - SEO-optimized content
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Featured products for the homepage
  featuredProducts: any[] = [];
  
  // Categories to display
  categories: any[] = [
    {
      id: 1,
      name: 'Fresh Fruits',
      image: '🍎',
      description: 'Fresh and organic fruits',
      itemCount: 150
    },
    {
      id: 2,
      name: 'Vegetables',
      image: '🥕',
      description: 'Garden fresh vegetables',
      itemCount: 200
    },
    {
      id: 3,
      name: 'Dairy Products',
      image: '🥛',
      description: 'Farm fresh dairy products',
      itemCount: 80
    },
    {
      id: 4,
      name: 'Meat & Seafood',
      image: '🍖',
      description: 'Premium quality meat',
      itemCount: 120
    },
    {
      id: 5,
      name: 'Bakery',
      image: '🍞',
      description: 'Fresh baked goods',
      itemCount: 90
    },
    {
      id: 6,
      name: 'Beverages',
      image: '🥤',
      description: 'Refreshing drinks',
      itemCount: 110
    }
  ];

  // Special offers
  specialOffers: any[] = [
    {
      title: 'Free Delivery',
      description: 'On orders over $50',
      icon: '🚚',
      color: 'green'
    },
    {
      title: 'Fresh Daily',
      description: 'New products every day',
      icon: '🌱',
      color: 'blue'
    },
    {
      title: '24/7 Support',
      description: 'Customer service available',
      icon: '📞',
      color: 'orange'
    }
  ];

  // Newsletter subscription
  email: string = '';
  isSubscribing: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  /**
   * Load featured products for homepage display
   */
  loadFeaturedProducts(): void {
    // Sample featured products (in real app, this would come from API)
    this.featuredProducts = [
      {
        id: 1,
        name: 'Organic Bananas',
        price: 2.99,
        originalPrice: 3.49,
        image: '🍌',
        rating: 4.5,
        discount: 15,
        badge: 'ORGANIC'
      },
      {
        id: 2,
        name: 'Fresh Strawberries',
        price: 4.99,
        originalPrice: 5.99,
        image: '🍓',
        rating: 4.8,
        discount: 17,
        badge: 'FRESH'
      },
      {
        id: 3,
        name: 'Whole Milk',
        price: 3.29,
        originalPrice: 3.99,
        image: '🥛',
        rating: 4.3,
        discount: 18,
        badge: 'DAIRY'
      },
      {
        id: 4,
        name: 'Artisan Bread',
        price: 4.49,
        originalPrice: 5.49,
        image: '🍞',
        rating: 4.7,
        discount: 18,
        badge: 'BAKERY'
      }
    ];
  }

  /**
   * Navigate to category products
   */
  viewCategory(categoryId: number): void {
    // Navigation logic would be implemented here
    console.log('Viewing category:', categoryId);
  }

  /**
   * Add product to cart from featured section
   */
  addToCart(product: any): void {
    // Cart service would be called here
    console.log('Adding to cart:', product.name);
  }

  /**
   * Subscribe to newsletter
   */
  subscribeNewsletter(): void {
    if (!this.email || this.isSubscribing) {
      return;
    }

    this.isSubscribing = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter subscription for:', this.email);
      this.email = '';
      this.isSubscribing = false;
      // Show success message
    }, 2000);
  }

  /**
   * Navigate to products page
   */
  shopNow(): void {
    // Router navigation would be implemented here
    console.log('Navigating to products page');
  }

  /**
   * View product details
   */
  viewProduct(productId: number): void {
    console.log('Viewing product:', productId);
  }
}