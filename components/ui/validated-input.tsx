"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ValidationResult } from "@/lib/validation"

interface ValidatedInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  validator: (value: string) => ValidationResult
  required?: boolean
  showValidation?: boolean
  className?: string
  icon?: React.ReactNode
}

export function ValidatedInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  validator,
  required = false,
  showValidation = true,
  className = "",
  icon,
}: ValidatedInputProps) {
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, message: "" })
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (touched || value) {
      const result = validator(value)
      setValidation(result)
    }
  }, [value, validator, touched])

  const handleBlur = () => {
    setTouched(true)
    const result = validator(value)
    setValidation(result)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-secondary-700">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">{icon}</div>}

        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`
            ${icon ? "pl-10" : ""} 
            ${type === "password" ? "pr-10" : ""} 
            ${touched && !validation.isValid ? "border-destructive focus:border-destructive" : ""} 
            ${touched && validation.isValid && value ? "border-success focus:border-success" : ""} 
            ${className}
          `}
        />

        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}

        {touched && showValidation && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {validation.isValid && value ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : !validation.isValid ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : null}
          </div>
        )}
      </div>

      {touched && !validation.isValid && showValidation && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{validation.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
