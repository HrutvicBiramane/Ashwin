"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Store,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"
import { useAuth } from "@/contexts/auth-context"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/dashboard/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/dashboard/orders" },
  { icon: Users, label: "Customers", href: "/admin/dashboard/customers" },
  { icon: BarChart3, label: "Analytics", href: "/admin/dashboard/analytics" },
  { icon: Store, label: "Inventory", href: "/admin/dashboard/inventory" },
  { icon: Settings, label: "Settings", href: "/admin/dashboard/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-25">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-grocery-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-primary-100 bg-gradient-to-r from-primary-50 to-primary-100">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                FreshCart Admin
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-primary-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="mt-6">
            <div className="px-3">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                          : "text-grocery-dark hover:bg-primary-50 hover:text-primary-600"
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Admin Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-100 bg-gradient-to-r from-primary-25 to-primary-50">
            <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
              <Avatar className="w-10 h-10 border-2 border-primary-200">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-grocery-dark">Admin User</p>
                <p className="text-xs text-grocery-neutral">admin@freshcart.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top header */}
          <header className="bg-white shadow-grocery border-b border-primary-100">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden mr-2 hover:bg-primary-50"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>

                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grocery-neutral w-4 h-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-80 border-primary-200 focus:border-primary-500 bg-primary-25 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative hover:bg-primary-50">
                      <Bell className="w-5 h-5" />
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-gradient-to-r from-accent-500 to-accent-600 shadow-md animate-pulse">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 shadow-grocery-lg">
                    <DropdownMenuLabel className="text-grocery-dark">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-primary-50">
                      <div className="flex flex-col">
                        <p className="font-medium text-grocery-dark">New order received</p>
                        <p className="text-sm text-grocery-neutral">Order #ORD-005 - $45.67</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-warning-50">
                      <div className="flex flex-col">
                        <p className="font-medium text-grocery-dark">Low stock alert</p>
                        <p className="text-sm text-grocery-neutral">Organic Apples - 5 items left</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-success-50">
                      <div className="flex flex-col">
                        <p className="font-medium text-grocery-dark">New customer registered</p>
                        <p className="text-sm text-grocery-neutral">john.doe@email.com</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-primary-50">
                      <Avatar className="h-8 w-8 border-2 border-primary-200">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="shadow-grocery-lg">
                    <DropdownMenuLabel className="text-grocery-dark">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-primary-50">
                      <User className="mr-2 h-4 w-4 text-primary-600" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary-50">
                      <Settings className="mr-2 h-4 w-4 text-primary-600" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:bg-destructive-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
