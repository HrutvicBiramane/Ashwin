"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Truck, Clock, Heart, ArrowRight, Leaf, Award } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const { user } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const heroSlides = [
    {
      title: "Fresh Groceries Delivered",
      subtitle: "Get farm-fresh produce delivered to your doorstep within hours",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
      cta: "Shop Now",
      badge: "Free Delivery",
    },
    {
      title: "Organic & Natural",
      subtitle: "Premium organic products for a healthier lifestyle",
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&h=600&fit=crop",
      cta: "Explore Organic",
      badge: "100% Organic",
    },
    {
      title: "Save More Every Day",
      subtitle: "Best prices on all your favorite grocery items",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      cta: "View Deals",
      badge: "Up to 50% Off",
    },
  ]

  const categories = [
    {
      name: "Fresh Fruits",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop",
      count: "150+ items",
      color: "from-red-500 to-orange-500",
    },
    {
      name: "Vegetables",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
      count: "200+ items",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Dairy Products",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop",
      count: "80+ items",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Meat & Seafood",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop",
      count: "120+ items",
      color: "from-red-600 to-pink-600",
    },
    {
      name: "Bakery",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      count: "90+ items",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Beverages",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
      count: "100+ items",
      color: "from-purple-500 to-indigo-500",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 2.99,
      originalPrice: 3.99,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      badge: "Organic",
      discount: 25,
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: 4.99,
      originalPrice: 6.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
      badge: "Fresh",
      discount: 29,
    },
    {
      id: 3,
      name: "Avocados (Pack of 4)",
      price: 5.99,
      originalPrice: 7.99,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      badge: "Premium",
      discount: 25,
    },
    {
      id: 4,
      name: "Greek Yogurt",
      price: 3.49,
      originalPrice: 4.49,
      image: "https://images.unsplash.com/photo-1571212515416-fca88c2d2c3e?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 203,
      badge: "Protein",
      discount: 22,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "FreshCart has completely changed how I shop for groceries. The quality is amazing and delivery is always on time!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      role: "Busy Professional",
      content: "As someone with a hectic schedule, FreshCart is a lifesaver. Fresh produce delivered right to my door!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Emily Davis",
      role: "Health Enthusiast",
      content: "The organic selection is fantastic. I love that I can trust the quality of everything I order.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
  ]

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => {
      clearInterval(slideTimer)
      clearInterval(testimonialTimer)
    }
  }, [heroSlides.length, testimonials.length])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-25 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="absolute inset-0 bg-grocery-pattern opacity-30"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-8">
              {user && (
                <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user.name?.charAt(0) || "U"}</span>
                  </div>
                  <span className="text-grocery-dark font-medium">Welcome back, {user.name}!</span>
                </div>
              )}

              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-1 text-sm font-medium shadow-md">
                  {heroSlides[currentSlide].badge}
                </Badge>
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-grocery-dark leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl text-grocery-neutral leading-relaxed max-w-lg">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 text-lg font-semibold shadow-grocery-lg hover:shadow-grocery-xl transition-all duration-300"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary-300 text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2 text-grocery-neutral">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Truck className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-grocery-neutral">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <Leaf className="w-5 h-5 text-success-600" />
                  </div>
                  <span className="font-medium">100% Organic</span>
                </div>
                <div className="flex items-center space-x-2 text-grocery-neutral">
                  <div className="p-2 bg-accent-100 rounded-lg">
                    <Clock className="w-5 h-5 text-accent-600" />
                  </div>
                  <span className="font-medium">30min Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-grocery-xl">
                <Image
                  src={heroSlides[currentSlide].image || "/placeholder.svg"}
                  alt="Fresh Groceries"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white shadow-md" : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary-100 text-primary-700 px-4 py-2 text-sm font-medium mb-4">
              Shop by Category
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-grocery-dark mb-6">Fresh Categories</h2>
            <p className="text-xl text-grocery-neutral max-w-2xl mx-auto">
              Discover our wide range of fresh, organic, and premium quality products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <Card className="group hover:shadow-grocery-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-grocery-dark backdrop-blur-sm">{category.count}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-grocery-dark group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-grocery-neutral mt-2 flex items-center">
                      Explore collection
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-primary-25 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-accent-100 text-accent-700 px-4 py-2 text-sm font-medium mb-4">Best Sellers</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-grocery-dark mb-6">Featured Products</h2>
            <p className="text-xl text-grocery-neutral max-w-2xl mx-auto">
              Hand-picked premium products with the best quality and freshness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-grocery-lg transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        className={`${
                          product.badge === "Organic"
                            ? "bg-success-500"
                            : product.badge === "Fresh"
                              ? "bg-primary-500"
                              : product.badge === "Premium"
                                ? "bg-grocery-premium"
                                : "bg-accent-500"
                        } text-white shadow-md`}
                      >
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-destructive text-white shadow-md">-{product.discount}%</Badge>
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-grocery-dark hover:bg-primary-50 shadow-md"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-grocery-neutral ml-2">({product.reviews})</span>
                  </div>
                  <h3 className="text-lg font-semibold text-grocery-dark mb-3 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                      <span className="text-sm text-grocery-neutral line-through">${product.originalPrice}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary-300 text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-success-100 text-success-700 px-4 py-2 text-sm font-medium mb-4">
              Why Choose FreshCart
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-grocery-dark mb-6">
              Your Trusted Grocery Partner
            </h2>
            <p className="text-xl text-grocery-neutral max-w-2xl mx-auto">
              We're committed to delivering the freshest products with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-md hover:shadow-grocery-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-grocery-dark mb-4">Fast Delivery</h3>
              <p className="text-grocery-neutral leading-relaxed">
                Get your groceries delivered within 30 minutes. We ensure quick and reliable delivery to your doorstep.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-md hover:shadow-grocery-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-grocery-dark mb-4">100% Organic</h3>
              <p className="text-grocery-neutral leading-relaxed">
                All our products are certified organic and sourced directly from trusted farms for maximum freshness.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-md hover:shadow-grocery-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-grocery-dark mb-4">Premium Quality</h3>
              <p className="text-grocery-neutral leading-relaxed">
                We maintain the highest quality standards and offer only the best products to our valued customers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white/80 text-primary-700 px-4 py-2 text-sm font-medium mb-4 backdrop-blur-sm">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-grocery-dark mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-grocery-neutral max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust FreshCart for their grocery needs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-0 shadow-grocery-lg bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-grocery-dark mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-primary-200 shadow-md"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-grocery-dark text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-grocery-neutral">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-primary-600 shadow-md" : "bg-primary-300 hover:bg-primary-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-medium mb-4 backdrop-blur-sm">
                Stay Updated
              </Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Get Fresh Deals & Updates</h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive
                deals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email address"
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 backdrop-blur-sm"
              />
              <Button
                size="lg"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </Button>
            </div>

            <p className="text-primary-200 text-sm mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
