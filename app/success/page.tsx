import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Clock, Home } from "lucide-react"

export default function SuccessPage() {
  const transactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2)

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-primary mb-4">Order Placed Successfully!</h1>

          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your payment and your order is being processed.
          </p>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm font-medium">{transactionId}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Order Total:</span>
              <span className="font-semibold text-primary">$12.93</span>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-600 pt-2 border-t">
              <Clock className="w-4 h-4 mr-2" />
              <span>Estimated delivery: {estimatedDelivery.toLocaleDateString()}</span>
            </div>
          </div>

          {/* What's Next */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-primary mb-3">What happens next?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span>Order confirmation email sent</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                <span>Order being prepared</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                <span>Out for delivery</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                <span>Delivered to your door</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/orders">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Package className="w-4 h-4 mr-2" />
                Track Your Order
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-6 pt-6 border-t text-sm text-gray-600">
            <p>Need help? Contact our support team at</p>
            <a href="mailto:support@freshcart.com" className="text-primary hover:underline">
              support@freshcart.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
