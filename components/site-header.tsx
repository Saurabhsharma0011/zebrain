"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Rocket, Scroll } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-sm bg-black/20 border-b border-green-500/20">
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between h-20">
          {/* Name */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link href="/" className="group">
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-green-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:via-purple-300 group-hover:to-green-300 transition-all duration-300">
                  $ZBRAIN
                </span>
                <span className="text-sm text-green-400 group-hover:text-green-300 transition-colors duration-300">
                  Zero Brain Cell
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Button
              variant="ghost"
              className="relative overflow-hidden group px-4 py-2 text-green-400 hover:text-black transition-colors duration-300"
              onClick={() => {
                document.getElementById("roadmap")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Scroll className="w-4 h-4 mr-2 group-hover:text-black transition-colors duration-300" />
              <span className="relative z-10">Roadmap</span>
            </Button>

            <Button
              variant="ghost"
              className="relative overflow-hidden group px-4 py-2 text-purple-400 hover:text-black transition-colors duration-300"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Brain className="w-4 h-4 mr-2 group-hover:text-black transition-colors duration-300" />
              <span className="relative z-10">About</span>
            </Button>

            <Button
              variant="ghost"
              className="relative overflow-hidden group px-4 py-2 text-green-400 hover:text-black transition-colors duration-300"
              onClick={() => {
                document.getElementById("community")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Rocket className="w-4 h-4 mr-2 group-hover:text-black transition-colors duration-300" />
              <span className="relative z-10">Community</span>
            </Button>
          </motion.nav>
        </div>
      </div>
    </header>
  )
}

