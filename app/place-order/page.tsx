"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Truck, MapPin, Clock } from "lucide-react"
import { ValidationPopup } from "@/components/ui/validation-popup"
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateZipCode,
} from "@/lib/validation"

export default function PlaceOrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [isLoading, setIsLoading] = useState(false)

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "error" as "error" | "success" | "warning" | "info",
    title: "",
    message: "",
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  })

  const showPopup = (type: "error" | "success" | "warning" | "info", title: string, message: string) => {
    setPopup({ isOpen: true, type, title, message })
  }

  const cartSummary = {
    subtotal: 11.97,
    tax: 0.96,
    shipping: 0,
    total: 12.93,
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)

    // Validate delivery information
    const requiredFields = [
      { value: formData.firstName, name: "First Name" },
      { value: formData.lastName, name: "Last Name" },
      { value: formData.address, name: "Address" },
      { value: formData.city, name: "City" },
      { value: formData.state, name: "State" },
      { value: formData.zip, name: "ZIP Code" },
      { value: formData.phone, name: "Phone" },
      { value: formData.email, name: "Email" },
    ]

    for (const field of requiredFields) {
      const validation = validateRequired(field.value, field.name)
      if (!validation.isValid) {
        showPopup("error", "Validation Error", validation.message)
        setIsLoading(false)
        return
      }
    }

    // Validate email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      showPopup("error", "Validation Error", emailValidation.message)
      setIsLoading(false)
      return
    }

    // Validate phone
    const phoneValidation = validatePhone(formData.phone)
    if (!phoneValidation.isValid) {
      showPopup("error", "Validation Error", phoneValidation.message)
      setIsLoading(false)
      return
    }

    // Validate ZIP code
    const zipValidation = validateZipCode(formData.zip)
    if (!zipValidation.isValid) {
      showPopup("error", "Validation Error", zipValidation.message)
      setIsLoading(false)
      return
    }

    // Validate payment if card is selected
    if (paymentMethod === "card") {
      const cardValidation = validateCardNumber(formData.cardNumber)
      if (!cardValidation.isValid) {
        showPopup("error", "Payment Validation Error", cardValidation.message)
        setIsLoading(false)
        return
      }

      const expiryValidation = validateExpiryDate(formData.expiry)
      if (!expiryValidation.isValid) {
        showPopup("error", "Payment Validation Error", expiryValidation.message)
        setIsLoading(false)
        return
      }

      const cvvValidation = validateCVV(formData.cvv)
      if (!cvvValidation.isValid) {
        showPopup("error", "Payment Validation Error", cvvValidation.message)
        setIsLoading(false)
        return
      }

      const cardNameValidation = validateRequired(formData.cardName, "Name on Card")
      if (!cardNameValidation.isValid) {
        showPopup("error", "Payment Validation Error", cardNameValidation.message)
        setIsLoading(false)
        return
      }
    }

    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false)
      showPopup("success", "Order Placed", "Your order has been placed successfully!")
      setTimeout(() => {
        window.location.href = "/success"
      }, 2000)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary mb-8">Place Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" value={formData.state} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" value={formData.zip} onChange={handleInputChange} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Leave at front door, ring doorbell, etc."
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Delivery Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Standard Delivery</p>
                          <p className="text-sm text-gray-600">2-3 business days</p>
                        </div>
                        <span className="font-medium text-accent">Free</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Express Delivery</p>
                          <p className="text-sm text-gray-600">Next business day</p>
                        </div>
                        <span className="font-medium">$9.99</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="same-day" id="same-day" />
                    <Label htmlFor="same-day" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Same Day Delivery</p>
                          <p className="text-sm text-gray-600">Within 4 hours</p>
                        </div>
                        <span className="font-medium">$19.99</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${cartSummary.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${cartSummary.tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{cartSummary.shipping === 0 ? "Free" : `$${cartSummary.shipping.toFixed(2)}`}</span>
                  </div>

                  {deliveryMethod === "express" && (
                    <div className="flex justify-between">
                      <span>Express Delivery:</span>
                      <span>$9.99</span>
                    </div>
                  )}

                  {deliveryMethod === "same-day" && (
                    <div className="flex justify-between">
                      <span>Same Day Delivery:</span>
                      <span>$19.99</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    $
                    {(
                      cartSummary.total +
                      (deliveryMethod === "express" ? 9.99 : 0) +
                      (deliveryMethod === "same-day" ? 19.99 : 0)
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {deliveryMethod === "same-day"
                        ? "Delivery within 4 hours"
                        : deliveryMethod === "express"
                          ? "Delivery tomorrow"
                          : "Delivery in 2-3 business days"}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>By placing this order, you agree to our Terms of Service</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ValidationPopup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => setPopup({ ...popup, isOpen: false })}
      />
    </div>
  )
}
