import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "$ZBRAIN - 0 brain cells",
  description: "The Token for 0 IQ Traders. No Brain? No Problem.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zbrainogo-aQNZIMLOgjXlqKEiYuDsz5JIXsjYnH.png",
    shortcut: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zbrainogo-aQNZIMLOgjXlqKEiYuDsz5JIXsjYnH.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zbrainogo-aQNZIMLOgjXlqKEiYuDsz5JIXsjYnH.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'