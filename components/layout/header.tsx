"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  MapPin,
  Phone,
  LogOut,
  Settings,
  Package,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Bakery",
    "Beverages",
    "Snacks",
    "Frozen Foods",
    "Health & Beauty",
  ]

  // User Profile Dropdown Component
  const UserProfileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-3 p-2 h-auto hover:bg-primary-50 rounded-lg transition-all duration-200"
        >
          <Avatar className="w-8 h-8 border-2 border-white shadow-md ring-2 ring-primary-100">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white text-sm font-semibold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-grocery-dark leading-none">{user?.name}</p>
            <p className="text-xs text-grocery-neutral mt-1">{user?.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 shadow-grocery-lg border-0">
        {/* Profile Header */}
        <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-white shadow-md">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="bg-white text-primary-600 text-lg font-bold">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{user?.name}</h3>
              <p className="text-sm opacity-90 truncate">{user?.email}</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-white/20 text-white border-white/30">
                {user?.role === "admin" ? "Administrator" : "Premium Customer"}
              </Badge>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-primary-50 to-white">
          <div className="grid grid-cols-1 gap-2 text-sm">
            {user?.phone && (
              <div className="flex items-center space-x-2 text-grocery-neutral">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>{user.phone}</span>
              </div>
            )}
            {user?.address && (
              <div className="flex items-center space-x-2 text-grocery-neutral">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="truncate">{user.address}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Menu Items */}
        <div className="p-2">
          <DropdownMenuGroup>
            {user?.role === "admin" ? (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center space-x-2 w-full hover:bg-primary-50 rounded-md"
                  >
                    <Settings className="w-4 h-4 text-primary-600" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/dashboard/settings"
                    className="flex items-center space-x-2 w-full hover:bg-primary-50 rounded-md"
                  >
                    <User className="w-4 h-4 text-primary-600" />
                    <span>Admin Settings</span>
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center space-x-2 w-full hover:bg-primary-50 rounded-md">
                    <User className="w-4 h-4 text-primary-600" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center space-x-2 w-full hover:bg-primary-50 rounded-md">
                    <Package className="w-4 h-4 text-primary-600" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="flex items-center space-x-2 w-full hover:bg-primary-50 rounded-md">
                    <Heart className="w-4 h-4 text-accent-500" />
                    <span>Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/payment-methods"
                    className="flex items-center space-x-2 w-full hover:bg-primary-50 rounded-md"
                  >
                    <CreditCard className="w-4 h-4 text-primary-600" />
                    <span>Payment Methods</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive hover:bg-destructive-50 rounded-md"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  // Mobile User Profile Sheet
  const MobileUserProfile = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 p-2 h-auto hover:bg-primary-50 rounded-lg">
          <Avatar className="w-8 h-8 ring-2 ring-primary-200">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white text-sm">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-grocery-dark">{user?.name}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-grocery-dark">My Account</SheetTitle>
          <SheetDescription className="text-grocery-neutral">Manage your profile and preferences</SheetDescription>
        </SheetHeader>

        {/* Profile Section */}
        <div className="mt-6 space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200">
            <Avatar className="w-16 h-16 border-2 border-white shadow-md ring-2 ring-primary-200">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white text-xl font-bold">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-grocery-dark truncate">{user?.name}</h3>
              <p className="text-sm text-grocery-neutral truncate">{user?.email}</p>
              <Badge variant="secondary" className="mt-1 bg-primary-100 text-primary-700 border-primary-200">
                {user?.role === "admin" ? "Administrator" : "Premium Customer"}
              </Badge>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            {user?.phone && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-primary-100 shadow-sm">
                <Phone className="w-5 h-5 text-primary-500" />
                <span className="text-sm text-grocery-dark">{user.phone}</span>
              </div>
            )}
            {user?.address && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-primary-100 shadow-sm">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-sm text-grocery-dark">{user.address}</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {user?.role === "admin" ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200"
                >
                  <Settings className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-grocery-dark">Admin Dashboard</span>
                </Link>
                <Link
                  href="/admin/dashboard/settings"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200"
                >
                  <User className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-grocery-dark">Admin Settings</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200"
                >
                  <User className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-grocery-dark">My Profile</span>
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200"
                >
                  <Package className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-grocery-dark">My Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent-50 transition-colors border border-transparent hover:border-accent-200"
                >
                  <Heart className="w-5 h-5 text-accent-500" />
                  <span className="font-medium text-grocery-dark">Wishlist</span>
                </Link>
                <Link
                  href="/payment-methods"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-200"
                >
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-grocery-dark">Payment Methods</span>
                </Link>
              </>
            )}
          </div>

          <Separator />

          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start shadow-md" size="lg">
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-b border-primary-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-grocery-neutral">
                <Phone className="w-3 h-3 mr-1 text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-grocery-neutral">
                <MapPin className="w-3 h-3 mr-1 text-primary-500" />
                <span>Free delivery on orders over $50</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-grocery-neutral">
              <Link href="/track-order" className="hover:text-primary-600 transition-colors">
                Track Order
              </Link>
              <Link href="/help" className="hover:text-primary-600 transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`bg-white shadow-grocery-lg sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-grocery-xl" : "shadow-grocery-lg"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  FreshCart
                </h1>
                <p className="text-xs text-grocery-neutral -mt-1">Fresh & Fast</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grocery-neutral w-5 h-5" />
                <Input
                  placeholder="Search for fresh groceries..."
                  className="pl-12 pr-4 h-12 text-base border-2 border-primary-200 focus:border-primary-500 rounded-full shadow-sm focus:shadow-md transition-all duration-200"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                  Search
                </Button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {user?.role !== "admin" && (
                <Link href="/wishlist" className="flex flex-col items-center group">
                  <div className="relative">
                    <Heart className="w-6 h-6 text-grocery-neutral group-hover:text-accent-500 transition-colors duration-200" />
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-gradient-to-r from-accent-500 to-accent-600 shadow-md animate-pulse">
                      2
                    </Badge>
                  </div>
                  <span className="text-xs text-grocery-neutral mt-1 group-hover:text-accent-500 transition-colors">
                    Wishlist
                  </span>
                </Link>
              )}

              {user ? (
                <UserProfileDropdown />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center p-2 h-auto hover:bg-primary-50 rounded-lg"
                    >
                      <User className="w-6 h-6 text-grocery-neutral" />
                      <span className="text-xs text-grocery-neutral mt-1">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 shadow-grocery-lg">
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="hover:bg-primary-50">
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="hover:bg-primary-50">
                        Create Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/register" className="hover:bg-primary-50">
                        Admin Login
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {user?.role !== "admin" && (
                <Link href="/cart" className="flex flex-col items-center group relative">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-grocery-neutral group-hover:text-primary-600 transition-colors duration-200" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-gradient-to-r from-accent-500 to-accent-600 shadow-md animate-pulse">
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-grocery-neutral mt-1 group-hover:text-primary-600 transition-colors">
                    Cart
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="lg:hidden hover:bg-primary-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Categories Navigation - Desktop */}
          {user?.role !== "admin" && (
            <div className="hidden lg:block border-t border-primary-100 bg-gradient-to-r from-primary-25 to-white">
              <div className="flex items-center justify-center space-x-8 py-3">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/products?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-grocery-neutral hover:text-primary-600 transition-colors whitespace-nowrap font-medium hover:bg-primary-50 px-3 py-1 rounded-md"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-100 bg-gradient-to-b from-primary-25 to-white">
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grocery-neutral w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 border-primary-200 focus:border-primary-500"
                  />
                </div>

                {/* Mobile User Profile */}
                {user && (
                  <div className="border-b border-primary-100 pb-4">
                    <MobileUserProfile />
                  </div>
                )}

                {/* Mobile Navigation */}
                <div className="flex flex-col space-y-3">
                  {user ? (
                    <>
                      {user.role === "admin" ? (
                        <>
                          <Link
                            href="/admin/dashboard"
                            className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                          >
                            Admin Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="text-destructive hover:text-destructive/80 py-2 font-medium text-left hover:bg-destructive-50 px-3 rounded-md transition-colors"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/"
                            className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                          >
                            Home
                          </Link>
                          <Link
                            href="/products"
                            className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                          >
                            All Products
                          </Link>
                          <Link
                            href="/orders"
                            className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                          >
                            My Orders
                          </Link>
                          <Link
                            href="/cart"
                            className="text-grocery-dark hover:text-primary-600 py-2 font-medium flex items-center hover:bg-primary-50 px-3 rounded-md transition-colors"
                          >
                            Cart{" "}
                            {cartCount > 0 && (
                              <Badge className="ml-2 bg-gradient-to-r from-accent-500 to-accent-600">{cartCount}</Badge>
                            )}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="text-destructive hover:text-destructive/80 py-2 font-medium text-left hover:bg-destructive-50 px-3 rounded-md transition-colors"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        href="/"
                        className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href="/products"
                        className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                      >
                        All Products
                      </Link>
                      <Link
                        href="/login"
                        className="text-grocery-dark hover:text-primary-600 py-2 font-medium hover:bg-primary-50 px-3 rounded-md transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/cart"
                        className="text-grocery-dark hover:text-primary-600 py-2 font-medium flex items-center hover:bg-primary-50 px-3 rounded-md transition-colors"
                      >
                        Cart{" "}
                        {cartCount > 0 && (
                          <Badge className="ml-2 bg-gradient-to-r from-accent-500 to-accent-600">{cartCount}</Badge>
                        )}
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile Categories */}
                {user?.role !== "admin" && (
                  <div className="border-t border-primary-100 pt-4">
                    <p className="font-medium text-grocery-dark mb-3">Categories</p>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          href={`/products?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm text-grocery-neutral hover:text-primary-600 py-1 hover:bg-primary-50 px-2 rounded transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
