"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthFormContainer from "@/components/auth/auth-form-container"
import { toast } from "sonner"
import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const termsAccepted = formData.get("termsAccepted") === "on"

    let isValid = true

    if (!fullName) {
      toast.error("Full name is required.")
      isValid = false
    }

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      isValid = false
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.")
      isValid = false
    }

    if (isValid) {
      // Simulate API call
      toast.success(`Account created for ${fullName}! (Simulated)`)
      // In a real app, you would make an API call here.
      // e.g., await signUpWithEmail(email, password, { data: { fullName } });
      // Then redirect or handle response.
      console.log("Form submitted with:", { fullName, email, password, termsAccepted })
    }
  }

  return (
    <AuthFormContainer
      title="Create Your Account"
      description="Join the forefront of innovation. Sign up to begin."
      footerContent={
        <p>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Log In
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Ada Lovelace"
            required
            aria-describedby="fullName-error"
          />
        </div>
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              required
              minLength={8}
              aria-describedby="confirmPassword-error"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="termsAccepted" name="termsAccepted" required aria-describedby="terms-error" />
          <Label htmlFor="termsAccepted" className="text-sm font-normal text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>
            {" and "}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </Label>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <UserPlus className="mr-2 h-5 w-5" /> Create Account
        </Button>
      </form>
    </AuthFormContainer>
  )
}
