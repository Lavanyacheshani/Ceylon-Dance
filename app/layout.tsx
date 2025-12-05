import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kandyan Dance - Learn Traditional Sri Lankan Dance",
  description:
    "Discover the art of Kandyan dance. Professional classes, courses, and registration for aspiring dancers.",
  icons: {
    icon: [
      {
        url: "/c.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/c.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/c.jpg",
        type: "image/svg+xml",
      },
    ],
    apple: "/c.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
