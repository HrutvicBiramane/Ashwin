"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, ShoppingBag } from "lucide-react"
import { ValidatedInput } from "@/components/ui/validated-input"
import { ValidationPopup } from "@/components/ui/validation-popup"
import { validateEmail } from "@/lib/validation"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
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

    // Validate email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      showPopup("error", "Validation Error", emailValidation.message)
      setIsLoading(false)
      return
    }

    // Basic password validation for login (not as strict as registration)
    if (!formData.password) {
      showPopup("error", "Validation Error", "Password is required")
      setIsLoading(false)
      return
    }

    try {
      const success = await login(formData.email, formData.password, "customer")
      if (success) {
        showPopup("success", "Success", "Login successful!")
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      } else {
        showPopup("error", "Login Failed", "Invalid email or password")
      }
    } catch (error) {
      showPopup("error", "Error", "An error occurred during login")
    }

    setIsLoading(false)
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
      <Card className="w-full max-w-md shadow-corporate-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-primary">Welcome Back</CardTitle>
          <CardDescription>Sign in to your FreshCart account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              validator={(value) => ({ isValid: !!value, message: value ? "" : "Password is required" })}
              required
              icon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-800 font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-secondary-600">
              Are you an admin?{" "}
              <Link href="/admin/register" className="text-accent hover:underline font-medium">
                Admin Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
