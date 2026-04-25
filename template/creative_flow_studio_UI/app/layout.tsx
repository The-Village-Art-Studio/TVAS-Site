import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientRootLayout from "./ClientRootLayout"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Flow Studio - Architecting Innovation",
  description:
    "Step into the Creative Flow Studio: where visionary ideas converge, pioneering digital tools empower, and innovation is engineered. Your hub for next-generation creativity.",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <ClientRootLayout>{children}</ClientRootLayout>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
