"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import BrainCursor from "@/components/brain-cursor"
import FloatingBrainCells from "@/components/floating-brain-cells"
import GlitchText from "@/components/glitch-text"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  const [holderCount, setHolderCount] = useState(420)
  const buyButtonRef = useRef<HTMLButtonElement>(null)

  // Increment holder count randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setHolderCount((prev) => prev + Math.floor(Math.random() * 5))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Buy button animation when mouse is nearby
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

        // If mouse is within 200px of the button
        if (distance < 200 && distance > 50) {
          buyButtonRef.current.classList.add("animate-wiggle")
        } else {
          buyButtonRef.current.classList.remove("animate-wiggle")
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const distance = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2))
        const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2))
        const intensity = 1 - Math.min(distance / maxDistance, 1)

        buyButtonRef.current.style.boxShadow = `0 0 ${20 * intensity}px ${10 * intensity}px rgba(16, 185, 129, ${0.5 * intensity})`
      }
    }

    const handleMouseLeave = () => {
      if (buyButtonRef.current) {
        buyButtonRef.current.style.boxShadow = "none"
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      <BrainCursor />
      <FloatingBrainCells />
      <SiteHeader />

      <main className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Gridline overlay */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black/50 to-green-900/10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-15 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black/80"></div>
        </div>

        {/* Glitch overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-30 z-10 bg-[url('/glitch-overlay.svg')] bg-repeat"></div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-green-900/20 z-0"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 max-w-4xl mx-auto mt-[-80px]"
          >
            <div className="mb-6">
              <GlitchText className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
                $ZBRAIN
              </GlitchText>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 font-bold text-green-400">
                The Token for 0 IQ Traders
              </h2>
            </div>

            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 text-purple-400">
              "No Brain, No Problem. Just Pump."
            </h3>

            <div className="mb-8">
              <Button
                ref={buyButtonRef}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white font-bold text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <Link
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-full"
                >
                  BUY NOW
                </Link>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Button>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-full sm:w-auto">
                  <p className="text-[10px] sm:text-xs italic text-gray-500 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
                    Token not live • Redirects to pump.fun
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-8 bg-black/50 p-4 rounded-lg border border-purple-500">
              <p className="text-sm sm:text-base lg:text-lg">
                Total IQ Lost: <span className="font-mono text-green-400">{holderCount.toLocaleString()}</span>
              </p>
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* What is $ZBRAIN? */}
        <section id="about" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
                What is $ZBRAIN?
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-purple-600 mx-auto"></div>
            </div>

            <div className="grid gap-8 items-center">
              <motion.div
                className="bg-black/70 p-4 sm:p-6 rounded-lg border border-green-500 shadow-lg shadow-green-500/10 transition-all duration-300 hover:shadow-green-500/30 hover:scale-105"
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.5 },
                }}
              >
                <p className="text-base sm:text-lg lg:text-xl mb-4">
                  Do you have 0 brain cells left? Great. You're in the right place.
                </p>
                <p className="text-sm sm:text-base lg:text-lg mb-4">
                  $ZBRAIN is the first token that rewards you for thinking less and aping more.
                </p>
                <p className="text-sm sm:text-base lg:text-lg mb-4 font-bold text-purple-400">
                  No roadmap. No utility. Just brain rot.
                </p>

                <ul className="space-y-2 mt-6">
                  <li className="flex items-center gap-2 text-green-400 text-sm sm:text-base">
                    <span className="text-white bg-green-600 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    No Brain? No Problem.
                  </li>
                  <li className="flex items-center gap-2 text-green-400 text-sm sm:text-base">
                    <span className="text-white bg-green-600 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    100% degen-approved.
                  </li>
                  <li className="flex items-center gap-2 text-green-400 text-sm sm:text-base">
                    <span className="text-white bg-green-600 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    HODLing makes your IQ drop faster.
                  </li>
                  <li className="flex items-center gap-2 text-green-400 text-sm sm:text-base">
                    <span className="text-white bg-green-600 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Buy before you accidentally start thinking.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Galaxy Brain Quotes */}
        <section className="py-16 sm:py-20 px-4 relative bg-gradient-to-b from-purple-900/20 to-green-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
              Galaxy Brain Quotes
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {[
                "Buy high, sell low. This is the way.",
                "I don't always HODL, but when I do, I forget my wallet password.",
                "My technical analysis is based on the shape of my breakfast cereal.",
                "I'm not a financial advisor, I'm a financial confuser.",
              ].map((quote, index) => (
                <motion.div
                  key={index}
                  className="bg-black/50 p-4 sm:p-6 rounded-lg border border-green-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-base sm:text-lg md:text-xl italic text-green-400">"{quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="py-16 sm:py-20 px-4 relative bg-gradient-to-b from-black to-purple-900/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
                Roadmap
              </h2>
              <p className="text-lg sm:text-xl text-purple-400">A Roadmap So Dumb, It's Genius</p>
              <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-purple-600 mx-auto mt-4"></div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-purple-500 transform sm:-translate-x-1/2"></div>

              {/* Phase 1 */}
              <div className="relative mb-8 sm:mb-16">
                <div className="sm:flex items-center">
                  <div className="sm:w-1/2 mb-4 sm:mb-0 sm:pr-8 sm:text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-green-400">Phase 1</h3>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base">
                      <li>Token Launch ($ZBRAIN will launch on 3/3/2025 between 17 to 18 UTC)</li>
                      <li>Degens lose brain cells</li>
                    </ul>
                  </div>
                  <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-green-500 rounded-full transform -translate-y-1/2 sm:-translate-x-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-500">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div className="sm:w-1/2 sm:pl-8">
                    <p className="text-green-400 text-base sm:text-lg">Brain cells: 100%</p>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative mb-8 sm:mb-16">
                <div className="sm:flex items-center">
                  <div className="sm:w-1/2 mb-4 sm:mb-0 sm:pr-8 sm:text-right">
                    <p className="text-green-400 text-base sm:text-lg">Brain cells: 75%</p>
                  </div>
                  <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-green-500 rounded-full transform -translate-y-1/2 sm:-translate-x-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-500">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <div className="sm:w-1/2 sm:pl-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-green-400">Phase 2</h3>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base">
                      <li>Marketing? Nah. Memes will do the work.</li>
                      <li>Community reaches full brain-dead status.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative mb-8 sm:mb-16">
                <div className="sm:flex items-center">
                  <div className="sm:w-1/2 mb-4 sm:mb-0 sm:pr-8 sm:text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-green-400">Phase 3</h3>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base">
                      <li>Either we moon or we rebrand to IQ 0.</li>
                      <li>Biggest brainless pump in history.</li>
                    </ul>
                  </div>
                  <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-green-500 rounded-full transform -translate-y-1/2 sm:-translate-x-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-500">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <div className="sm:w-1/2 sm:pl-8">
                    <p className="text-green-400 text-base sm:text-lg">Brain cells: 25%</p>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="relative">
                <div className="sm:flex items-center">
                  <div className="sm:w-1/2 mb-4 sm:mb-0 sm:pr-8 sm:text-right">
                    <p className="text-green-400 text-base sm:text-lg">Brain cells: 0%</p>
                  </div>
                  <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-green-500 rounded-full transform -translate-y-1/2 sm:-translate-x-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-500">
                    <span className="text-black font-bold">4</span>
                  </div>
                  <div className="sm:w-1/2 sm:pl-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-green-400">Phase 4</h3>
                    <ul className="mt-2 space-y-1 text-sm sm:text-base">
                      <li>We don't think this far ahead.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="community" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
                Join the Brain Dead Cult
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-purple-600 mx-auto"></div>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">Join our cult of IQ 0 degens before it's too late.</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="w-full sm:w-40 h-12 bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] group">
                  <Link
                    href="https://x.com/zerobrain_sol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-full"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">Twitter</span>
                  </Link>
                </Button>
                <Button className="w-full sm:w-40 h-12 bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] group">
                  <Link
                    href="https://t.me/ZBRAINsol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-full"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">Telegram</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 sm:py-8 px-4 border-t border-green-500/30">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              $ZBRAIN © {new Date().getFullYear()} | 0 Brain Cells Required
            </p>
          </div>
        </footer>
      </main>
      <style jsx global>
        {`
          html {
            scroll-behavior: smooth;
          }
          body {
            @apply bg-black text-white;
          }

          @media (max-width: 640px) {
            h1, h2 {
              @apply text-3xl;
            }
            h3 {
              @apply text-xl;
            }
            p {
              @apply text-base;
            }
          }
          @keyframes subtle-pulse {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.1; }
          }

          .grid-overlay {
            animation: subtle-pulse 8s ease-in-out infinite;
          }
        `}
      </style>
    </>
  )
}

