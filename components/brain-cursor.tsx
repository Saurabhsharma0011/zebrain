"use client"

import { useEffect, useState } from "react"

export default function BrainCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateCursor)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
    }
  }, [])

  return (
    <div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
              fill="currentColor"
            />
            <path
              d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z"
              fill="#000"
              className="animate-[spin_3s_linear_infinite]"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-3 h-6 bg-green-500 rounded-full opacity-50 animate-[drip_2s_ease-in-out_infinite]"></div>
      </div>
      <style jsx>{`
        @keyframes drip {
          0%, 100% { transform: translateY(0) scale(0.5); opacity: 0.5; }
          50% { transform: translateY(20px) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

