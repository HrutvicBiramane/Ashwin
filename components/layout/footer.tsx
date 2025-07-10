import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-grocery-dark to-secondary-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                FreshCart
              </h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted online grocery partner, delivering fresh products right to your doorstep with care and
              quality.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-primary-500/20 rounded-lg hover:bg-primary-500/30 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 hover:text-primary-400 transition-colors" />
              </div>
              <div className="p-2 bg-primary-500/20 rounded-lg hover:bg-primary-500/30 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 hover:text-primary-400 transition-colors" />
              </div>
              <div className="p-2 bg-accent-500/20 rounded-lg hover:bg-accent-500/30 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5 hover:text-accent-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/orders"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-accent-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-accent-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-accent-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-accent-500 rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary-500/20 rounded-lg mr-3">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="p-2 bg-accent-500/20 rounded-lg mr-3">
                  <Mail className="w-4 h-4 text-accent-400" />
                </div>
                <span className="text-gray-300">support@freshcart.com</span>
              </div>
              <div className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary-500/20 rounded-lg mr-3">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-gray-300">123 Grocery St, Food City, FC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-center md:text-left">© 2024 FreshCart. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/terms" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/cookies" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
