"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ValidatedInput } from "@/components/ui/validated-input"
import { ValidationPopup } from "@/components/ui/validation-popup"
import { useAuth } from "@/contexts/auth-context"
import {
  validateName,
  validateEmail,
  validateMobileNumber,
  validateAddress,
  validateCity,
  validateState,
  validateZipCode,
  validatePassword,
} from "@/lib/validation"
import { User, Mail, Phone, MapPin, Camera, Save, Key, Shield, Bell, Package, Settings, Edit3 } from "lucide-react"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "success" as "error" | "success" | "warning" | "info",
    title: "",
    message: "",
  })

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    newsletter: true,
  })

  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || ["", ""]
      setProfileData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: "",
        state: "",
        zipCode: "",
      })
    }
  }, [user])

  const showPopup = (type: "error" | "success" | "warning" | "info", title: string, message: string) => {
    setPopup({ isOpen: true, type, title, message })
  }

  const handleProfileSave = async () => {
    // Validate all fields
    const validations = [
      validateName(profileData.firstName, "First Name"),
      validateName(profileData.lastName, "Last Name"),
      validateEmail(profileData.email),
      validateMobileNumber(profileData.phone),
      validateAddress(profileData.address),
    ]

    const invalidValidation = validations.find((v) => !v.isValid)
    if (invalidValidation) {
      showPopup("error", "Validation Error", invalidValidation.message)
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        name: `${profileData.firstName} ${profileData.lastName}`.trim(),
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
      }

      updateUser(updatedUser)
      setIsLoading(false)
      showPopup("success", "Success", "Profile updated successfully!")
    }, 1000)
  }

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword) {
      showPopup("error", "Validation Error", "Current password is required")
      return
    }

    const passwordValidation = validatePassword(passwordData.newPassword)
    if (!passwordValidation.isValid) {
      showPopup("error", "Validation Error", passwordValidation.message)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showPopup("error", "Validation Error", "New passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setIsLoading(false)
      showPopup("success", "Success", "Password changed successfully!")
    }, 1000)
  }

  const generateAvatar = () => {
    // Simulate avatar generation
    showPopup("info", "Avatar Generated", "New avatar has been generated successfully!")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Access Denied</h2>
            <p className="text-secondary-600 mb-6">Please log in to view your profile.</p>
            <Button onClick={() => (window.location.href = "/login")} className="bg-primary hover:bg-primary-800">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <ValidationPopup
          isOpen={popup.isOpen}
          onClose={() => setPopup({ ...popup, isOpen: false })}
          type={popup.type}
          title={popup.title}
          message={popup.message}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">My Profile</h1>
              <p className="text-secondary-600">Manage your account settings and preferences</p>
            </div>
            <Badge variant="secondary" className="w-fit mt-4 md:mt-0">
              {user.role === "admin" ? "Administrator" : "Customer"}
            </Badge>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-8 shadow-corporate">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  onClick={generateAvatar}
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-accent hover:bg-accent-600"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-heading font-bold text-primary mb-2">{user.name}</h2>
                <p className="text-secondary-600 mb-4">{user.email}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Phone className="w-4 h-4 text-secondary-500" />
                    <span>{user.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="w-4 h-4 text-secondary-500" />
                    <span>{user.address || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Package className="w-4 h-4 text-secondary-500" />
                    <span>Member since 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1">
            <TabsTrigger value="personal" className="flex items-center space-x-2 py-3">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Personal Info</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2 py-3">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
              <span className="sm:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2 py-3">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Preferences</span>
              <span className="sm:hidden">Prefs</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2 py-3">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="shadow-corporate">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ValidatedInput
                    id="firstName"
                    label="First Name"
                    value={profileData.firstName}
                    onChange={(value) => setProfileData({ ...profileData, firstName: value })}
                    validator={(value) => validateName(value, "First Name")}
                    required
                    icon={<User className="w-4 h-4" />}
                  />

                  <ValidatedInput
                    id="lastName"
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={(value) => setProfileData({ ...profileData, lastName: value })}
                    validator={(value) => validateName(value, "Last Name")}
                    required
                    icon={<User className="w-4 h-4" />}
                  />

                  <ValidatedInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    onChange={(value) => setProfileData({ ...profileData, email: value })}
                    validator={validateEmail}
                    required
                    icon={<Mail className="w-4 h-4" />}
                  />

                  <ValidatedInput
                    id="phone"
                    label="Mobile Number"
                    type="tel"
                    value={profileData.phone}
                    onChange={(value) => setProfileData({ ...profileData, phone: value })}
                    validator={validateMobileNumber}
                    required
                    icon={<Phone className="w-4 h-4" />}
                  />
                </div>

                <ValidatedInput
                  id="address"
                  label="Address"
                  value={profileData.address}
                  onChange={(value) => setProfileData({ ...profileData, address: value })}
                  validator={validateAddress}
                  required
                  icon={<MapPin className="w-4 h-4" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ValidatedInput
                    id="city"
                    label="City"
                    value={profileData.city}
                    onChange={(value) => setProfileData({ ...profileData, city: value })}
                    validator={validateCity}
                  />

                  <ValidatedInput
                    id="state"
                    label="State"
                    value={profileData.state}
                    onChange={(value) => setProfileData({ ...profileData, state: value })}
                    validator={validateState}
                  />

                  <ValidatedInput
                    id="zipCode"
                    label="ZIP Code"
                    value={profileData.zipCode}
                    onChange={(value) => setProfileData({ ...profileData, zipCode: value })}
                    validator={validateZipCode}
                  />
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button
                    onClick={handleProfileSave}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-800 px-8"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card className="shadow-corporate">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ValidatedInput
                  id="currentPassword"
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(value) => setPasswordData({ ...passwordData, currentPassword: value })}
                  validator={(value) => ({ isValid: !!value, message: value ? "" : "Current password is required" })}
                  required
                />

                <ValidatedInput
                  id="newPassword"
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(value) => setPasswordData({ ...passwordData, newPassword: value })}
                  validator={validatePassword}
                  required
                />

                <ValidatedInput
                  id="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(value) => setPasswordData({ ...passwordData, confirmPassword: value })}
                  validator={(value) => ({
                    isValid: value === passwordData.newPassword,
                    message: value === passwordData.newPassword ? "" : "Passwords do not match",
                  })}
                  required
                />

                <Separator />

                <div className="flex justify-end">
                  <Button
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-800 px-8"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    {isLoading ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className="shadow-corporate">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(preferences).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                        <p className="text-sm text-secondary-600">
                          {key === "emailNotifications" && "Receive notifications via email"}
                          {key === "smsNotifications" && "Receive notifications via SMS"}
                          {key === "orderUpdates" && "Get updates about your orders"}
                          {key === "promotionalEmails" && "Receive promotional offers"}
                          {key === "newsletter" && "Subscribe to our newsletter"}
                        </p>
                      </div>
                      <Button
                        variant={value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreferences({ ...preferences, [key]: !value })}
                      >
                        {value ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary-800 px-8">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card className="shadow-corporate">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Recent Orders</span>
                </CardTitle>
                <CardDescription>View your recent order history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">No orders yet</h3>
                  <p className="text-secondary-600 mb-6">Start shopping to see your orders here</p>
                  <Button
                    onClick={() => (window.location.href = "/products")}
                    className="bg-primary hover:bg-primary-800"
                  >
                    Start Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
