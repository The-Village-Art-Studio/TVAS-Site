"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthFormContainer from "@/components/auth/auth-form-container"
import { toast } from "sonner" // Assuming sonner is installed via shadcn/ui
import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, LogInIcon as LoginIcon } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    let isValid = true

    if (!email) {
      toast.error("Email is required.")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.")
      isValid = false
    }

    if (!password) {
      toast.error("Password is required.")
      isValid = false
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.")
      isValid = false
    }

    if (isValid) {
      // Simulate API call
      toast.success(`Login successful for ${email}! (Simulated)`)
      // In a real app, you would make an API call here.
      // e.g., await signInWithEmail(email, password);
      // Then redirect or handle response.
      console.log("Form submitted with:", { email, password })
    }
  }

  return (
    <AuthFormContainer
      title="Welcome Back"
      description="Log in to access your creative workspace."
      footerContent={
        <p>
          {"Don't have an account? "}
          <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            aria-describedby="email-error"
          />
          {/* Error messages could be displayed here */}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password" // Placeholder
              className="text-sm text-primary hover:underline"
              aria-label="Forgot your password?"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              aria-describedby="password-error"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          {/* Error messages could be displayed here */}
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <LoginIcon className="mr-2 h-5 w-5" /> Log In
        </Button>
      </form>
      {/* OAuth Provider Buttons (Example) */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3">
          {" "}
          {/* Changed to 1 column for simplicity, can be 2 */}
          <Button variant="outline" className="w-full">
            {/* Placeholder for Google Icon */}
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          {/* Add more provider buttons here (e.g., GitHub, Apple) */}
        </div>
      </div>
    </AuthFormContainer>
  )
}
