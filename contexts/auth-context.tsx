"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer"
  phone?: string
  address?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: "admin" | "customer") => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("freshcart_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "admin" | "customer" = "customer"): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Updated admin credentials
    if (role === "admin" && email === "admin@freshcart.com" && password === "FreshCart@2024") {
      const adminUser: User = {
        id: "admin-1",
        name: "System Administrator",
        email: "admin@freshcart.com",
        role: "admin",
        phone: "+1 (555) 000-0000",
        address: "FreshCart Headquarters, Business District",
        avatar: "/placeholder.svg?height=100&width=100",
      }
      setUser(adminUser)
      localStorage.setItem("freshcart_user", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    } else if (role === "customer" && email && password) {
      const customerUser: User = {
        id: "customer-1",
        name: "Customer User",
        email: email,
        role: "customer",
        phone: "",
        address: "",
        avatar: "/placeholder.svg?height=100&width=100",
      }
      setUser(customerUser)
      localStorage.setItem("freshcart_user", JSON.stringify(customerUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("freshcart_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("freshcart_user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
