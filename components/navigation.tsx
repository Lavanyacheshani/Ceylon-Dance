"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/classes", label: "Classes" },
    { href: "/register", label: "Register" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/c.jpg"       // <-- Your logo from public/
              alt="Kandyan Dance Logo"
              width={45}
              height={45}
              className="rounded-full object-cover"
            />
            <span className="text-xl font-bold text-primary hidden sm:inline">
              Ceylon Dance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-300 ${isActive(link.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground hover:text-primary"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive("/shop")
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-foreground hover:bg-primary hover:text-white"
                }`}
            >
              <ShoppingCart size={20} />
              <span className="hidden lg:inline">Shop</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/shop" className="p-2">
              <ShoppingCart size={20} className="text-primary" />
            </Link>
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition-colors ${isActive(link.href)
                    ? "bg-primary text-white font-semibold"
                    : "text-foreground hover:bg-secondary"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
