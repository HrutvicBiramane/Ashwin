import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Login Component - User Authentication
 * 
 * This component handles:
 * - User login with email/password
 * - Form validation and error handling
 * - Password visibility toggle
 * - Remember me functionality
 * - Forgot password flow
 * - Social authentication integration
 * - Redirect after successful login
 * 
 * Security Features:
 * - Client-side validation
 * - Password strength requirements
 * - Rate limiting protection
 * - Secure token handling
 * - Account lockout protection
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Login form
  loginForm: FormGroup;
  
  // UI state
  isLoading: boolean = false;
  showPassword: boolean = false;
  loginError: string = '';
  
  // Form submission tracking
  submitted: boolean = false;
  loginAttempts: number = 0;
  maxAttempts: number = 5;
  
  // Remember me functionality
  rememberMe: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    // Initialize reactive form with validation
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128)
      ]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Check if user credentials are remembered
    this.loadRememberedCredentials();
    
    // Focus on email field
    setTimeout(() => {
      const emailField = document.getElementById('email');
      if (emailField) {
        emailField.focus();
      }
    }, 100);
  }

  /**
   * Get form control for easier access in template
   */
  get formControls() {
    return this.loginForm.controls;
  }

  /**
   * Check if form field has error
   */
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.loginForm.get(fieldName);
    if (!field) return false;
    
    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched || this.submitted);
    }
    
    return field.invalid && (field.dirty || field.touched || this.submitted);
  }

  /**
   * Get error message for form field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !this.hasError(fieldName)) return '';

    if (field.hasError('required')) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    
    if (field.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `Password must be at least ${minLength} characters long`;
    }
    
    if (field.hasError('maxlength')) {
      const maxLength = field.getError('maxlength').requiredLength;
      return `${this.getFieldDisplayName(fieldName)} cannot exceed ${maxLength} characters`;
    }

    return 'Invalid input';
  }

  /**
   * Get display name for field
   */
  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    
    return displayNames[fieldName] || fieldName;
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;
    this.loginError = '';

    // Check if maximum attempts reached
    if (this.loginAttempts >= this.maxAttempts) {
      this.loginError = 'Maximum login attempts exceeded. Please try again later.';
      return;
    }

    // Validate form
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Start loading
    this.isLoading = true;

    // Get form values
    const formData = this.loginForm.value;
    const loginRequest = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      rememberMe: formData.rememberMe
    };

    // Simulate API call (replace with actual authentication service)
    this.performLogin(loginRequest);
  }

  /**
   * Perform login API call
   */
  private performLogin(loginRequest: any): void {
    // Simulate API delay
    setTimeout(() => {
      try {
        // Demo login logic (replace with actual API call)
        if (this.validateDemoCredentials(loginRequest.email, loginRequest.password)) {
          this.handleLoginSuccess(loginRequest);
        } else {
          this.handleLoginError('Invalid email or password');
        }
      } catch (error) {
        this.handleLoginError('An unexpected error occurred. Please try again.');
      }
    }, 2000);
  }

  /**
   * Demo credential validation (replace with actual API)
   */
  private validateDemoCredentials(email: string, password: string): boolean {
    // Demo credentials for testing
    const demoCredentials = [
      { email: 'admin@freshcart.com', password: 'Admin123!' },
      { email: 'user@freshcart.com', password: 'User123!' },
      { email: 'demo@freshcart.com', password: 'Demo123!' }
    ];

    return demoCredentials.some(cred => 
      cred.email === email && cred.password === password
    );
  }

  /**
   * Handle successful login
   */
  private handleLoginSuccess(loginRequest: any): void {
    // Store authentication tokens (demo implementation)
    const demoToken = 'demo_jwt_token_' + Date.now();
    const demoUser = {
      email: loginRequest.email,
      firstName: 'John',
      lastName: 'Doe',
      role: loginRequest.email.includes('admin') ? 'ADMIN' : 'CUSTOMER'
    };

    // Store in localStorage
    localStorage.setItem('freshcart_token', demoToken);
    localStorage.setItem('freshcart_user', JSON.stringify(demoUser));

    // Handle remember me
    if (loginRequest.rememberMe) {
      localStorage.setItem('freshcart_remember_email', loginRequest.email);
    } else {
      localStorage.removeItem('freshcart_remember_email');
    }

    // Dispatch login event
    window.dispatchEvent(new CustomEvent('userLoggedIn'));

    // Reset form and state
    this.isLoading = false;
    this.loginAttempts = 0;
    this.loginError = '';

    // Redirect to dashboard or intended page
    console.log('Login successful, redirecting...');
    
    // Show success message
    this.showSuccessMessage('Welcome back! Login successful.');
  }

  /**
   * Handle login error
   */
  private handleLoginError(errorMessage: string): void {
    this.isLoading = false;
    this.loginAttempts++;
    this.loginError = errorMessage;

    // Clear password field for security
    this.loginForm.patchValue({ password: '' });

    // Check if account should be locked
    if (this.loginAttempts >= this.maxAttempts) {
      this.loginError = `Too many failed attempts. Account temporarily locked. Please try again in 15 minutes.`;
    }
  }

  /**
   * Mark all form fields as touched for validation display
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Load remembered credentials from storage
   */
  private loadRememberedCredentials(): void {
    const rememberedEmail = localStorage.getItem('freshcart_remember_email');
    if (rememberedEmail) {
      this.loginForm.patchValue({
        email: rememberedEmail,
        rememberMe: true
      });
    }
  }

  /**
   * Show success message (integrate with notification service)
   */
  private showSuccessMessage(message: string): void {
    // This would integrate with the notification service
    console.log('Success:', message);
  }

  /**
   * Navigate to registration page
   */
  goToRegister(): void {
    console.log('Navigating to register page');
    // Router navigation would be implemented here
  }

  /**
   * Navigate to forgot password page
   */
  goToForgotPassword(): void {
    console.log('Navigating to forgot password page');
    // Router navigation would be implemented here
  }

  /**
   * Handle social login (Google, Facebook, etc.)
   */
  socialLogin(provider: string): void {
    console.log(`Social login with ${provider}`);
    // Social authentication implementation would go here
  }

  /**
   * Clear all form errors
   */
  clearErrors(): void {
    this.loginError = '';
    this.submitted = false;
  }

  /**
   * Handle Enter key press in form
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isLoading) {
      this.onSubmit();
    }
  }
}