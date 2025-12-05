"use client"

import { useState, useEffect } from "react"
import { Download, Trash2, Eye } from "lucide-react"

interface Registration {
  id: string
  fullName: string
  email: string
  phone: string
  age: string
  course: string
  courseName: string
  coursePrice: number
  preferredTimeSlot: string
  date: string
}

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)

  useEffect(() => {
    // Load registrations from localStorage
    const stored = localStorage.getItem("registrations")
    if (stored) {
      setRegistrations(JSON.parse(stored))
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = registrations.filter((r) => r.id !== id)
    setRegistrations(updated)
    localStorage.setItem("registrations", JSON.stringify(updated))
  }

  const exportToCSV = () => {
    const headers = ["Full Name", "Email", "Phone", "Age", "Course", "Time Slot", "Date"]
    const rows = registrations.map((r) => [
      r.fullName,
      r.email,
      r.phone,
      r.age,
      r.courseName,
      r.preferredTimeSlot,
      r.date,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Registrations</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Download size={20} />
          Export to CSV
        </button>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-foreground/70 text-lg">No registrations yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold">Course</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-secondary transition-colors">
                    <td className="px-6 py-4">{reg.fullName}</td>
                    <td className="px-6 py-4 text-sm">{reg.email}</td>
                    <td className="px-6 py-4 text-sm">{reg.phone}</td>
                    <td className="px-6 py-4 font-medium">{reg.courseName}</td>
                    <td className="px-6 py-4 text-sm">{new Date(reg.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedRegistration(reg)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Eye size={18} className="text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Registration Details</h2>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-foreground/70">Full Name</p>
                <p className="font-semibold">{selectedRegistration.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70">Email</p>
                <p className="font-semibold">{selectedRegistration.email}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70">Phone</p>
                <p className="font-semibold">{selectedRegistration.phone}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70">Age</p>
                <p className="font-semibold">{selectedRegistration.age}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70">Course</p>
                <p className="font-semibold">{selectedRegistration.courseName}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70">Preferred Time Slot</p>
                <p className="font-semibold">{selectedRegistration.preferredTimeSlot}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/70">Registration Date</p>
                <p className="font-semibold">{new Date(selectedRegistration.date).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedRegistration(null)}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
