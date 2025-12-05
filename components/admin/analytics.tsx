"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsProps {
  registrations: any[]
}

export default function Analytics({ registrations }: AnalyticsProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Group registrations by course
    const courseStats = registrations.reduce((acc: any, reg) => {
      const existing = acc.find((item: any) => item.name === reg.courseName)
      if (existing) {
        existing.students += 1
      } else {
        acc.push({
          name: reg.courseName,
          students: 1,
        })
      }
      return acc
    }, [])

    setChartData(courseStats)
  }, [registrations])

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-foreground/70">No data available yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Enrollment by Course</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" fill="var(--color-primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
