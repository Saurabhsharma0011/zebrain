"use client"

import { motion } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RugAlertProps {
  onClose: () => void
}

export default function RugAlert({ onClose }: RugAlertProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
    >
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg border-2 border-red-400 flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 flex-shrink-0 animate-pulse" />
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">WARNING: RUG PULL DETECTED!</h3>
          <p className="text-sm mb-2">The dev team is running away with all funds!</p>
          <p className="text-xs italic mb-3">Just kidding! This is what happens when you invest with 0 brain cells.</p>
          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-white text-red-600 hover:bg-red-100 px-3 py-1 text-sm rounded">
              <span className="mr-1">False Alarm</span>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

