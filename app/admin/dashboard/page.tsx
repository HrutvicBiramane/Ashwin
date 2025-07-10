"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success-600",
      bgColor: "bg-success-50",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      title: "Total Customers",
      value: "856",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-accent-600",
      bgColor: "bg-accent-50",
    },
    {
      title: "Products",
      value: "342",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-warning-600",
      bgColor: "bg-warning-50",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      status: "completed",
      amount: "$45.67",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      status: "processing",
      amount: "$32.45",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      status: "shipped",
      amount: "$78.90",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      status: "pending",
      amount: "$23.56",
      date: "2024-01-14",
    },
  ]

  const topProducts = [
    { name: "Organic Apples", sales: 145, revenue: "$724.55", progress: 85 },
    { name: "Fresh Bananas", sales: 132, revenue: "$394.68", progress: 78 },
    { name: "Whole Milk", sales: 98, revenue: "$391.02", progress: 65 },
    { name: "Greek Yogurt", sales: 87, revenue: "$521.13", progress: 58 },
    { name: "Chicken Breast", sales: 76, revenue: "$683.24", progress: 52 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success-100 text-success-800"
      case "processing":
        return "bg-warning-100 text-warning-800"
      case "shipped":
        return "bg-primary-100 text-primary-800"
      default:
        return "bg-secondary-100 text-secondary-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
        <h1 className="text-3xl font-bold text-grocery-dark">Dashboard</h1>
        <p className="text-grocery-neutral mt-2">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-grocery hover:shadow-grocery-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-grocery-neutral">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-grocery-dark">{stat.value}</div>
              <div className="flex items-center text-xs text-grocery-neutral mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-success-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-success-600" : "text-destructive"}>{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-grocery">
          <CardHeader className="bg-gradient-to-r from-primary-25 to-primary-50 rounded-t-lg">
            <CardTitle className="text-grocery-dark">Recent Orders</CardTitle>
            <CardDescription className="text-grocery-neutral">Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-primary-100">
                  <TableHead className="text-grocery-dark">Order</TableHead>
                  <TableHead className="text-grocery-dark">Customer</TableHead>
                  <TableHead className="text-grocery-dark">Status</TableHead>
                  <TableHead className="text-grocery-dark">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-primary-25 border-primary-50">
                    <TableCell className="font-medium text-grocery-dark">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-grocery-dark">{order.customer}</p>
                        <p className="text-sm text-grocery-neutral">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-grocery-dark">{order.amount}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="hover:bg-primary-50">
                        <Eye className="h-4 w-4 text-primary-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-grocery">
          <CardHeader className="bg-gradient-to-r from-accent-25 to-accent-50 rounded-t-lg">
            <CardTitle className="text-grocery-dark">Top Products</CardTitle>
            <CardDescription className="text-grocery-neutral">Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-25 to-white rounded-lg hover:from-primary-50 transition-all duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm text-grocery-dark">{product.name}</p>
                      <p className="text-sm font-medium text-primary-600">{product.revenue}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-grocery-neutral">{product.sales} sales</p>
                      <p className="text-xs text-grocery-neutral">{product.progress}%</p>
                    </div>
                    <Progress value={product.progress} className="h-2 bg-primary-100" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-grocery">
        <CardHeader className="bg-gradient-to-r from-success-25 to-success-50 rounded-t-lg">
          <CardTitle className="text-grocery-dark">Quick Actions</CardTitle>
          <CardDescription className="text-grocery-neutral">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
              <Package className="h-6 w-6 mb-2" />
              Add Product
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 bg-transparent"
            >
              <ShoppingCart className="h-6 w-6 mb-2 text-primary-600" />
              View Orders
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col border-2 border-accent-200 hover:bg-accent-50 hover:border-accent-300 transition-all duration-300 bg-transparent"
            >
              <Users className="h-6 w-6 mb-2 text-accent-600" />
              Manage Users
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col border-2 border-success-200 hover:bg-success-50 hover:border-success-300 transition-all duration-300 bg-transparent"
            >
              <TrendingUp className="h-6 w-6 mb-2 text-success-600" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
