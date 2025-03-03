"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
}

export default function GlitchText({ children, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Randomly trigger glitch effect
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      },
      Math.random() * 5000 + 2000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="relative">
      <div className={cn("relative z-10", className)}>{children}</div>

      {isGlitching && (
        <>
          <div
            className={cn("absolute inset-0 text-red-500 z-0", className)}
            style={{
              left: "2px",
              top: "2px",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
          >
            {children}
          </div>
          <div
            className={cn("absolute inset-0 text-blue-500 z-0", className)}
            style={{
              left: "-2px",
              top: "-2px",
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

