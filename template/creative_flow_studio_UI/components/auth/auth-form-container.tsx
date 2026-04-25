import type React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import StudioLogoIcon from "@/components/icons/studio-logo-icon"
import Link from "next/link"

interface AuthFormContainerProps {
  title: string
  description: string
  children: React.ReactNode
  footerContent?: React.ReactNode
}

export default function AuthFormContainer({ title, description, children, footerContent }: AuthFormContainerProps) {
  return (
    <Card className="w-full bg-card/90 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader className="text-center">
        <Link href="/" className="inline-block mb-6" aria-label="Back to Homepage">
          <StudioLogoIcon className="w-12 h-12 text-primary mx-auto" />
        </Link>
        <CardTitle className="text-3xl font-bold text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col items-center text-center text-sm text-muted-foreground">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  )
}
