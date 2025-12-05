"use client"

import type React from "react"
import { ShoppingCart } from "lucide-react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, Home, Users, BookOpen, DollarSign } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    router.push("/admin/login")
  }

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/registrations", label: "Registrations", icon: Users },
    { href: "/admin/classes", label: "Classes", icon: BookOpen },
    { href: "/admin/payments", label: "Payments", icon: DollarSign },
    { href: "/admin/shop", label: "Shop Products", icon: ShoppingCart },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-primary text-primary-foreground transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-primary/80 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-foreground/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary/80 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}
