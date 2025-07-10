export interface ValidationResult {
  isValid: boolean
  message: string
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!email) {
    return { isValid: false, message: "Email address is required" }
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" }
  }

  if (email.length > 254) {
    return { isValid: false, message: "Email address is too long" }
  }

  return { isValid: true, message: "" }
}

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: "Password is required" }
  }

  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" }
  }

  if (password.length > 128) {
    return { isValid: false, message: "Password must be less than 128 characters" }
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" }
  }

  if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character" }
  }

  // Check for common weak patterns
  const commonPatterns = [
    /(.)\1{2,}/, // Three or more repeated characters
    /123456|654321|qwerty|password|admin/i, // Common sequences
  ]

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      return { isValid: false, message: "Password contains common patterns and is not secure" }
    }
  }

  return { isValid: true, message: "" }
}

export const validateMobileNumber = (mobile: string): ValidationResult => {
  // Remove all non-digit characters for validation
  const cleanMobile = mobile.replace(/\D/g, "")

  if (!mobile) {
    return { isValid: false, message: "Mobile number is required" }
  }

  // Check for minimum length (10 digits for most countries)
  if (cleanMobile.length < 10) {
    return { isValid: false, message: "Mobile number must be at least 10 digits" }
  }

  // Check for maximum length (15 digits as per international standard)
  if (cleanMobile.length > 15) {
    return { isValid: false, message: "Mobile number cannot exceed 15 digits" }
  }

  // Check for valid patterns (US, international)
  const mobilePatterns = [
    /^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/, // US format
    /^\+?[1-9]\d{1,14}$/, // International format
  ]

  const isValidFormat = mobilePatterns.some((pattern) => pattern.test(cleanMobile))

  if (!isValidFormat) {
    return { isValid: false, message: "Please enter a valid mobile number" }
  }

  // Check for obviously invalid numbers
  if (/^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/.test(cleanMobile)) {
    return { isValid: false, message: "Mobile number cannot be all the same digit" }
  }

  return { isValid: true, message: "" }
}

export const validateName = (name: string, fieldName = "Name"): ValidationResult => {
  if (!name || name.trim() === "") {
    return { isValid: false, message: `${fieldName} is required` }
  }

  if (name.trim().length < 2) {
    return { isValid: false, message: `${fieldName} must be at least 2 characters long` }
  }

  if (name.trim().length > 50) {
    return { isValid: false, message: `${fieldName} cannot exceed 50 characters` }
  }

  // Check for valid name characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-'.]+$/

  if (!nameRegex.test(name.trim())) {
    return { isValid: false, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` }
  }

  // Check for consecutive spaces or special characters
  if (/\s{2,}|[-']{2,}/.test(name)) {
    return { isValid: false, message: `${fieldName} cannot contain consecutive spaces or special characters` }
  }

  return { isValid: true, message: "" }
}

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === "") {
    return { isValid: false, message: `${fieldName} is required` }
  }

  return { isValid: true, message: "" }
}

export const validateCardNumber = (cardNumber: string): ValidationResult => {
  const cleanNumber = cardNumber.replace(/\s/g, "")

  if (!cleanNumber) {
    return { isValid: false, message: "Card number is required" }
  }

  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return { isValid: false, message: "Card number must be 13-19 digits" }
  }

  // Luhn algorithm validation
  let sum = 0
  let isEven = false

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleanNumber.charAt(i), 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  if (sum % 10 !== 0) {
    return { isValid: false, message: "Invalid card number" }
  }

  return { isValid: true, message: "" }
}

export const validateExpiryDate = (expiry: string): ValidationResult => {
  if (!expiry) {
    return { isValid: false, message: "Expiry date is required" }
  }

  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/

  if (!expiryRegex.test(expiry)) {
    return { isValid: false, message: "Expiry date must be in MM/YY format" }
  }

  const [month, year] = expiry.split("/")
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const expYear = Number.parseInt(year, 10)
  const expMonth = Number.parseInt(month, 10)

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return { isValid: false, message: "Card has expired" }
  }

  return { isValid: true, message: "" }
}

export const validateCVV = (cvv: string): ValidationResult => {
  if (!cvv) {
    return { isValid: false, message: "CVV is required" }
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    return { isValid: false, message: "CVV must be 3 or 4 digits" }
  }

  return { isValid: true, message: "" }
}

export const validateZipCode = (zipCode: string): ValidationResult => {
  if (!zipCode) {
    return { isValid: false, message: "ZIP code is required" }
  }

  const zipRegex = /^\d{5}(-\d{4})?$/

  if (!zipRegex.test(zipCode)) {
    return { isValid: false, message: "Please enter a valid ZIP code (12345 or 12345-6789)" }
  }

  return { isValid: true, message: "" }
}

export const validateAddress = (address: string): ValidationResult => {
  if (!address || address.trim() === "") {
    return { isValid: false, message: "Address is required" }
  }

  if (address.trim().length < 5) {
    return { isValid: false, message: "Address must be at least 5 characters long" }
  }

  if (address.trim().length > 200) {
    return { isValid: false, message: "Address cannot exceed 200 characters" }
  }

  return { isValid: true, message: "" }
}

export const validateCity = (city: string): ValidationResult => {
  if (!city || city.trim() === "") {
    return { isValid: false, message: "City is required" }
  }

  if (city.trim().length < 2) {
    return { isValid: false, message: "City name must be at least 2 characters long" }
  }

  if (city.trim().length > 50) {
    return { isValid: false, message: "City name cannot exceed 50 characters" }
  }

  const cityRegex = /^[a-zA-Z\s\-'.]+$/

  if (!cityRegex.test(city.trim())) {
    return { isValid: false, message: "City name can only contain letters, spaces, hyphens, and apostrophes" }
  }

  return { isValid: true, message: "" }
}

export const validateState = (state: string): ValidationResult => {
  if (!state || state.trim() === "") {
    return { isValid: false, message: "State is required" }
  }

  if (state.trim().length < 2) {
    return { isValid: false, message: "State must be at least 2 characters long" }
  }

  if (state.trim().length > 50) {
    return { isValid: false, message: "State cannot exceed 50 characters" }
  }

  return { isValid: true, message: "" }
}
