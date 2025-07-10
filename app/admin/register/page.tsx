"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, Lock, Info } from "lucide-react"
import { ValidatedInput } from "@/components/ui/validated-input"
import { ValidationPopup } from "@/components/ui/validation-popup"
import { validateEmail, validatePassword } from "@/lib/validation"
import { useAuth } from "@/contexts/auth-context"

export default function AdminRegisterPage() {
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

    // Validate password
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      showPopup("error", "Validation Error", passwordValidation.message)
      setIsLoading(false)
      return
    }

    try {
      const success = await login(formData.email, formData.password, "admin")
      if (success) {
        showPopup("success", "Success", "Admin login successful!")
        setTimeout(() => {
          window.location.href = "/admin/dashboard"
        }, 1000)
      } else {
        showPopup("error", "Login Failed", "Invalid admin credentials. Please check your email and password.")
      }
    } catch (error) {
      showPopup("error", "Error", "An error occurred during login")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <Card className="w-full max-w-md shadow-corporate-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-primary">Admin Access</CardTitle>
          <CardDescription>Sign in to FreshCart Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credentials Info */}
          <Alert className="border-accent/20 bg-accent/5">
            <Info className="h-4 w-4 text-accent" />
            <AlertDescription className="text-sm">
              <strong>Admin Credentials:</strong>
              <br />
              Email: admin@freshcart.com
              <br />
              Password: FreshCart@2024
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <ValidatedInput
              id="email"
              label="Admin Email"
              type="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              validator={validateEmail}
              required
              icon={<Mail className="w-4 h-4" />}
            />

            <ValidatedInput
              id="password"
              label="Admin Password"
              type="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              validator={validatePassword}
              required
              icon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-800 font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Not an admin?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Customer Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
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
