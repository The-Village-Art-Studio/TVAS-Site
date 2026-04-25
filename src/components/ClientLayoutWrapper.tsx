"use client"

import { useState, useCallback } from "react"
import type { BlobMode } from "./shared/LavaLampBackground"
import LavaLampBackground from "./shared/LavaLampBackground"
import ModernHeader from "./ModernHeader"
import Footer from "./Footer"

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [lavaMode, setLavaMode] = useState<BlobMode>("standard")

  const modes: BlobMode[] = ["standard", "leviathan", "molten", "bioluminescent", "swarm"]
  
  const cycleLavaMode = useCallback(() => {
    setLavaMode((prev) => {
      const currentIndex = modes.indexOf(prev)
      return modes[(currentIndex + 1) % modes.length]
    })
  }, [])

  const nextMode = modes[(modes.indexOf(lavaMode) + 1) % modes.length]

  return (
    <>
      <LavaLampBackground mode={lavaMode} />
      <ModernHeader 
        cycleLavaMode={cycleLavaMode} 
        currentLavaMode={lavaMode} 
        nextLavaMode={nextMode} 
      />
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
