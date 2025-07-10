"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Phone, MapPin, Lock, UserPlus } from "lucide-react"
import { ValidatedInput } from "@/components/ui/validated-input"
import { ValidationPopup } from "@/components/ui/validation-popup"
import { validateName, validateEmail, validateMobileNumber, validateAddress, validatePassword } from "@/lib/validation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "error" as "error" | "success" | "warning" | "info",
    title: "",
    message: "",
  })

  const showPopup = (type: "error" | "success" | "warning" | "info", title: string, message: string) => {
    setPopup({ isOpen: true, type, title, message })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate all fields
    const validations = [
      validateName(formData.firstName, "First Name"),
      validateName(formData.lastName, "Last Name"),
      validateEmail(formData.email),
      validateMobileNumber(formData.phone),
      validateAddress(formData.address),
      validatePassword(formData.password),
    ]

    const invalidValidation = validations.find((v) => !v.isValid)
    if (invalidValidation) {
      showPopup("error", "Validation Error", invalidValidation.message)
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showPopup("error", "Validation Error", "Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      showPopup("success", "Registration Successful", "Your account has been created successfully!")
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <ValidationPopup
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        type={popup.type}
        title={popup.title}
        message={popup.message}
      />
      <Card className="w-full max-w-2xl shadow-corporate-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-primary">Create Account</CardTitle>
          <CardDescription>Join FreshCart and start shopping today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValidatedInput
                id="firstName"
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(value) => setFormData({ ...formData, firstName: value })}
                validator={(value) => validateName(value, "First Name")}
                required
                icon={<User className="w-4 h-4" />}
              />

              <ValidatedInput
                id="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(value) => setFormData({ ...formData, lastName: value })}
                validator={(value) => validateName(value, "Last Name")}
                required
                icon={<User className="w-4 h-4" />}
              />
            </div>

            <ValidatedInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              validator={validateEmail}
              required
              icon={<Mail className="w-4 h-4" />}
            />

            <ValidatedInput
              id="phone"
              label="Mobile Number"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              validator={validateMobileNumber}
              required
              icon={<Phone className="w-4 h-4" />}
            />

            <ValidatedInput
              id="address"
              label="Address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(value) => setFormData({ ...formData, address: value })}
              validator={validateAddress}
              required
              icon={<MapPin className="w-4 h-4" />}
            />

            <ValidatedInput
              id="password"
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              validator={validatePassword}
              required
              icon={<Lock className="w-4 h-4" />}
            />

            <ValidatedInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
              validator={(value) => ({
                isValid: value === formData.password,
                message: value === formData.password ? "" : "Passwords do not match",
              })}
              required
              icon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-800 font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
