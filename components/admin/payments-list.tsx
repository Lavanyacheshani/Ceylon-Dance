"use client"

import { useState, useEffect } from "react"

interface Payment {
  id: string
  studentName: string
  email: string
  amount: number
  course: string
  status: "completed" | "pending" | "failed"
  date: string
}

export default function PaymentsList() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    // Simulate loading payments from localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
    const paymentsList: Payment[] = registrations.map((reg: any) => ({
      id: reg.id,
      studentName: reg.fullName,
      email: reg.email,
      amount: reg.coursePrice,
      course: reg.courseName,
      status: "completed" as const,
      date: reg.date,
    }))
    setPayments(paymentsList)
  }, [])

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)
  const completedPayments = payments.filter((p) => p.status === "completed").length

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-primary mb-8">Payments</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-foreground/70 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-primary mt-2">${(totalRevenue / 100).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-foreground/70 text-sm font-medium">Completed Payments</p>
          <p className="text-3xl font-bold text-green-500 mt-2">{completedPayments}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-foreground/70 text-sm font-medium">Average Payment</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">${(totalRevenue / payments.length / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Payments Table */}
      {payments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-foreground/70 text-lg">No payments yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Course</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-secondary transition-colors">
                    <td className="px-6 py-4">{payment.studentName}</td>
                    <td className="px-6 py-4 text-sm">{payment.email}</td>
                    <td className="px-6 py-4">{payment.course}</td>
                    <td className="px-6 py-4 font-bold">${(payment.amount / 100).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{new Date(payment.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
