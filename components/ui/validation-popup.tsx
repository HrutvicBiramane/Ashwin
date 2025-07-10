"use client"

import { useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

interface ValidationPopupProps {
  isOpen: boolean
  onClose: () => void
  type: "error" | "success" | "warning" | "info"
  title: string
  message: string
  autoClose?: boolean
  duration?: number
}

export function ValidationPopup({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose = true,
  duration = 5000,
}: ValidationPopupProps) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoClose, duration, onClose])

  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case "info":
        return <Info className="w-5 h-5 text-info" />
    }
  }

  const getAlertClass = () => {
    switch (type) {
      case "error":
        return "border-destructive/50 text-destructive bg-destructive/10"
      case "success":
        return "border-success/50 text-success bg-success/10"
      case "warning":
        return "border-warning/50 text-warning bg-warning/10"
      case "info":
        return "border-info/50 text-info bg-info/10"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <Alert className={`max-w-md ${getAlertClass()}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            {getIcon()}
            <div>
              <h4 className="font-semibold">{title}</h4>
              <AlertDescription className="mt-1">{message}</AlertDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 hover:bg-transparent">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Alert>
    </div>
  )
}
