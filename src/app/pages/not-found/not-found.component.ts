import { Component } from '@angular/core';

/**
 * Not Found Component (404 Page)
 * 
 * This component displays when users navigate to non-existent routes.
 * Features professional design with helpful navigation options.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor() { }

  /**
   * Navigate back to home page
   */
  goHome(): void {
    console.log('Navigating to home page');
    // Router navigation would be implemented here
  }

  /**
   * Navigate back in browser history
   */
  goBack(): void {
    window.history.back();
  }
}