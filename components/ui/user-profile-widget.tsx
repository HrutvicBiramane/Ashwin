"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { User, Package, Heart, Settings, ArrowRight, MapPin, Phone, Mail, Crown } from "lucide-react"

export function UserProfileWidget() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-6">
        {/* Header with Avatar and Basic Info */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt={user.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            {user.role === "admin" && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                <Crown className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-heading font-bold text-primary mb-2 truncate">{user.name}</h3>
          <p className="text-sm text-secondary-600 mb-3 truncate">{user.email}</p>
          <Badge
            variant="secondary"
            className={`text-xs font-medium ${
              user.role === "admin" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
            }`}
          >
            {user.role === "admin" ? "Administrator" : "Premium Customer"}
          </Badge>
        </div>

        {/* User Details */}
        <div className="space-y-3 mb-6">
          {user.phone && (
            <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
              <Phone className="w-4 h-4 text-secondary-500 flex-shrink-0" />
              <span className="text-sm text-secondary-700 truncate">{user.phone}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
              <MapPin className="w-4 h-4 text-secondary-500 flex-shrink-0" />
              <span className="text-sm text-secondary-700 truncate">{user.address}</span>
            </div>
          )}
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
            <Mail className="w-4 h-4 text-secondary-500 flex-shrink-0" />
            <span className="text-sm text-secondary-700">Member since 2024</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {user.role === "admin" ? (
            <>
              <Link href="/admin/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white hover:bg-secondary-50 border-secondary-200"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/dashboard/settings">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white hover:bg-secondary-50 border-secondary-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/orders">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white hover:bg-secondary-50 border-secondary-200"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-white hover:bg-secondary-50 border-secondary-200"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Profile Link */}
        <Link href="/profile">
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <User className="w-4 h-4 mr-2" />
            View Full Profile
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
