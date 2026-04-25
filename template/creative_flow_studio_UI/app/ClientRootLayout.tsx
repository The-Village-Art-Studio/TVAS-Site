"use client"

import { useMemo, useState, useCallback, useEffect } from "react"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import EnhancedLavaLamp3D, { type BlobMode } from "@/components/enhanced-lava-lamp-3d"

const MODES_CYCLE: BlobMode[] = ["standard", "leviathan", "molten", "bioluminescent", "swarm"]

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [lavaMode, setLavaMode] = useState<BlobMode>("standard")
  const [isLavaLampReady, setIsLavaLampReady] = useState(false)

  const cycleLavaMode = useCallback(() => {
    setLavaMode((prevMode) => {
      const currentIndex = MODES_CYCLE.indexOf(prevMode)
      const nextIndex = (currentIndex + 1) % MODES_CYCLE.length
      return MODES_CYCLE[nextIndex]
    })
  }, [])

  const nextLavaMode = useMemo(() => {
    const currentIndex = MODES_CYCLE.indexOf(lavaMode)
    const nextIndex = (currentIndex + 1) % MODES_CYCLE.length
    return MODES_CYCLE[nextIndex]
  }, [lavaMode])

  const handleLavaLampCreated = useCallback(() => {
    setTimeout(() => {
      setIsLavaLampReady(true)
    }, 150)
  }, [])

  useEffect(() => {
    if (!isLavaLampReady) {
      document.body.classList.add("app-loading")
    } else {
      document.body.classList.remove("app-loading")
    }
    return () => {
      document.body.classList.remove("app-loading")
    }
  }, [isLavaLampReady])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {!isLavaLampReady && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background pointer-events-none">
          <div className="flex flex-col items-center text-center p-4">
            <svg
              className="animate-spin h-12 w-12 text-primary mb-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-foreground text-lg font-medium mb-1">Igniting Creative Sparks...</p>
            <p className="text-muted-foreground text-sm">Please wait a moment.</p>
          </div>
        </div>
      )}
      <div className="transition-opacity duration-1000 ease-in-out" style={{ opacity: isLavaLampReady ? 1 : 0 }}>
        <EnhancedLavaLamp3D mode={lavaMode} onCanvasCreated={handleLavaLampCreated} />
        {/* Subtle overlay to ensure text readability over dynamic background, adjust as needed */}
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header cycleLavaMode={cycleLavaMode} currentLavaMode={lavaMode} nextLavaMode={nextLavaMode} />
        <main className="flex-grow">
          <div
            className="pt-16 transition-opacity duration-700 ease-in-out"
            style={{ opacity: isLavaLampReady ? 1 : 0.05, filter: isLavaLampReady ? "none" : "blur(4px)" }}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
