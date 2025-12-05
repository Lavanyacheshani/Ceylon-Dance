"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle, Mail, AlertCircle } from "lucide-react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [registrationData, setRegistrationData] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Simulate checking payment status
      setTimeout(() => {
        const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
        const latestReg = registrations[registrations.length - 1]

        if (latestReg) {
          setRegistrationData(latestReg)
          setStatus("success")
        } else {
          setStatus("error")
        }
      }, 1000)
    }
  }, [sessionId])

  return (
    <>
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin">
              <div className="w-16 h-16 border-4 border-border border-t-primary rounded-full mx-auto"></div>
            </div>
            <p className="text-lg text-foreground/70 mt-6">Processing your registration...</p>
          </div>
        )}

        {status === "success" && registrationData && (
          <div className="w-full animate-fade-in">
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-primary mb-2">Registration Confirmed!</h1>
              <p className="text-lg text-foreground/70">Your registration has been successfully processed.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Mail size={24} className="text-blue-500" />
                Registration Details
              </h2>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70">Full Name</p>
                    <p className="text-lg font-semibold">{registrationData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Email</p>
                    <p className="text-lg font-semibold">{registrationData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70">Course</p>
                    <p className="text-lg font-semibold">{registrationData.courseName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Amount Paid</p>
                    <p className="text-lg font-bold text-primary">${(registrationData.coursePrice / 100).toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70">Preferred Time Slot</p>
                    <p className="text-lg font-semibold">{registrationData.preferredTimeSlot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Date</p>
                    <p className="text-lg font-semibold">{new Date(registrationData.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700">
                  A confirmation email has been sent to <strong>{registrationData.email}</strong> with all the details
                  and next steps.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors text-center"
                >
                  Back to Home
                </Link>
                <Link
                  href="/classes"
                  className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                >
                  View More Classes
                </Link>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-sm text-amber-800">
                Please check your email for the confirmation details. If you have any questions, please contact us at
                info@kandyandance.com
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="w-full animate-fade-in">
            <div className="text-center mb-8">
              <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-primary mb-2">Something Went Wrong</h1>
              <p className="text-lg text-foreground/70">Unable to process your registration at this time.</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-red-700">
                Please try again or contact us at info@kandyandance.com for assistance.
              </p>
            </div>

            <Link
              href="/register"
              className="w-full block text-center bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Try Again
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default function Confirmation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
