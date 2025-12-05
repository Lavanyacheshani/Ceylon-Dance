// Local database simulation for development/demo
// In production, replace with real database (Supabase, Firebase, etc.)

export interface Registration {
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
  status?: "pending" | "confirmed" | "cancelled"
}

export interface Payment {
  id: string
  registrationId: string
  studentName: string
  email: string
  amount: number
  course: string
  status: "completed" | "pending" | "failed"
  date: string
  transactionId?: string
}

export interface Course {
  id: string
  name: string
  level: string
  duration: string
  schedule: string
  priceInCents: number
  maxStudents: number
  currentEnrollment?: number
}

// Utility functions to manage local storage
export const localDB = {
  // Registrations
  getRegistrations: (): Registration[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("registrations")
    return data ? JSON.parse(data) : []
  },

  addRegistration: (registration: Omit<Registration, "id" | "date">) => {
    const registrations = localDB.getRegistrations()
    const newReg: Registration = {
      ...registration,
      id: `reg-${Date.now()}`,
      date: new Date().toISOString(),
    }
    registrations.push(newReg)
    localStorage.setItem("registrations", JSON.stringify(registrations))
    return newReg
  },

  deleteRegistration: (id: string) => {
    const registrations = localDB.getRegistrations()
    const filtered = registrations.filter((r) => r.id !== id)
    localStorage.setItem("registrations", JSON.stringify(filtered))
  },

  // Payments
  getPayments: (): Payment[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("payments")
    return data ? JSON.parse(data) : []
  },

  addPayment: (payment: Omit<Payment, "id" | "date">) => {
    const payments = localDB.getPayments()
    const newPayment: Payment = {
      ...payment,
      id: `pay-${Date.now()}`,
      date: new Date().toISOString(),
    }
    payments.push(newPayment)
    localStorage.setItem("payments", JSON.stringify(payments))
    return newPayment
  },

  // Analytics
  getStats: () => {
    const registrations = localDB.getRegistrations()
    const payments = localDB.getPayments()

    return {
      totalRegistrations: registrations.length,
      totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
      completedPayments: payments.filter((p) => p.status === "completed").length,
      pendingPayments: payments.filter((p) => p.status === "pending").length,
      courseStats: registrations.reduce((acc: any, reg) => {
        acc[reg.course] = (acc[reg.course] || 0) + 1
        return acc
      }, {}),
    }
  },
}
