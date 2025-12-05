"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Demo credentials
  const ADMIN_EMAIL = "admin@kandyandance.com"
  const ADMIN_PASSWORD = "admin123"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate login - In production, use proper authentication
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store auth token in localStorage
        localStorage.setItem("adminToken", "authenticated_" + Date.now())
        localStorage.setItem("adminEmail", email)

        // Redirect to dashboard
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white">
              <Lock size={32} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-primary mb-2">Admin Login</h1>
          <p className="text-center text-foreground/70 mb-8">Access the Kandyan Dance management panel</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg border border-red-300">{error}</div>}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="admin@kandyandance.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-foreground/60 font-mono bg-muted p-3 rounded text-center">
              Demo: admin@kandyandance.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
