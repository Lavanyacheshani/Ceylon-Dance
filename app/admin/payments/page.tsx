"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import PaymentsList from "@/components/admin/payments-list"

export default function Payments() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) return null
  if (!isAuthenticated) return null

  return (
    <AdminLayout>
      <PaymentsList />
    </AdminLayout>
  )
}
