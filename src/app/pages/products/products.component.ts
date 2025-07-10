import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <div class="page-container">
      <h1>🛍️ Products</h1>
      <p>Product catalog page is under construction.</p>
      <p>This page will show all available products with search and filtering capabilities.</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      text-align: center;
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    h1 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
  `]
})
export class ProductsComponent { }