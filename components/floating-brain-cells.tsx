"use client"

import { useEffect, useState } from "react"

interface BrainCell {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
}

export default function FloatingBrainCells() {
  const [brainCells, setBrainCells] = useState<BrainCell[]>([])

  useEffect(() => {
    // Create initial brain cells - reduced from 15 to 8
    const initialCells: BrainCell[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 15 + 8, // Slightly smaller size range
      speed: Math.random() * 1.5 + 0.5, // Slightly slower speed
      opacity: Math.random() * 0.4 + 0.1, // Reduced opacity
      rotation: Math.random() * 360,
    }))

    setBrainCells(initialCells)

    // Add more brain cells on scroll - reduced frequency
    const handleScroll = () => {
      setBrainCells((prev) => {
        if (Math.random() > 0.85 && prev.length < 12) {
          // Reduced max cells
          return [
            ...prev,
            {
              id: Date.now(),
              x: Math.random() * window.innerWidth,
              y: window.scrollY + Math.random() * window.innerHeight,
              size: Math.random() * 15 + 8,
              speed: Math.random() * 1.5 + 0.5,
              opacity: Math.random() * 0.4 + 0.1,
              rotation: Math.random() * 360,
            },
          ]
        }
        return prev
      })
    }

    // Optimize animation with requestAnimationFrame
    let animationFrameId: number
    const animateBrainCells = () => {
      setBrainCells((prev) =>
        prev
          .map((cell) => ({
            ...cell,
            y: cell.y - cell.speed,
            x: cell.x + Math.sin(cell.y / 50) * 0.5,
            rotation: cell.rotation + 0.2,
            opacity: cell.y < -50 ? 0 : cell.opacity,
          }))
          .filter((cell) => cell.opacity > 0),
      )
      animationFrameId = requestAnimationFrame(animateBrainCells)
    }

    window.addEventListener("scroll", handleScroll)
    animationFrameId = requestAnimationFrame(animateBrainCells)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {brainCells.map((cell) => (
        <div
          key={cell.id}
          className="absolute rounded-full bg-green-500 transition-transform duration-1000 ease-out"
          style={{
            left: `${cell.x}px`,
            top: `${cell.y}px`,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
            opacity: cell.opacity,
            transform: `rotate(${cell.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

