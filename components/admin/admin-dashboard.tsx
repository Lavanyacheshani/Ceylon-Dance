"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 4,
    totalRevenue: 0,
    todayRegistrations: 0,
  })

  useEffect(() => {
    // Simulate loading stats from localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
    const totalStudents = registrations.length
    const totalRevenue = registrations.reduce((sum: number, reg: any) => sum + reg.coursePrice, 0)
    const today = new Date().toDateString()
    const todayRegistrations = registrations.filter((reg: any) => new Date(reg.date).toDateString() === today).length

    setStats({
      totalStudents,
      totalCourses: 4,
      totalRevenue,
      todayRegistrations,
    })
  }, [])

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-blue-500" },
    { label: "Active Courses", value: stats.totalCourses, icon: BookOpen, color: "text-green-500" },
    {
      label: "Total Revenue",
      value: `$${(stats.totalRevenue / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-500",
    },
    { label: "Today Registrations", value: stats.todayRegistrations, icon: TrendingUp, color: "text-orange-500" },
  ]

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/70 text-sm font-medium">{stat.label}</p>
                <p className="text-4xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/registrations"
            className="p-4 bg-primary/10 border border-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <p className="font-bold text-primary">View All Registrations</p>
            <p className="text-sm text-foreground/70">Manage student registrations</p>
          </a>
          <a
            href="/admin/classes"
            className="p-4 bg-primary/10 border border-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <p className="font-bold text-primary">Manage Classes</p>
            <p className="text-sm text-foreground/70">Add, edit, or delete classes</p>
          </a>
          <a
            href="/admin/payments"
            className="p-4 bg-primary/10 border border-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <p className="font-bold text-primary">View Payments</p>
            <p className="text-sm text-foreground/70">Check payment status and revenue</p>
          </a>
        </div>
      </div>
    </div>
  )
}
