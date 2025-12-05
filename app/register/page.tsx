"use client"

import { useState, Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import RegistrationForm from "@/components/registration-form"
import Checkout, { type PaymentDetails } from "@/components/checkout"
import { COURSES } from "@/lib/products"
import { Check, CreditCard, UserRound, Shield, Sparkles, Clock } from "lucide-react"

type Step = "form" | "payment" | "success"

function RegisterContent() {
  const searchParams = useSearchParams()
  const courseParam = searchParams.get("course")

  const [step, setStep] = useState<Step>("form")
  const [selectedCourse, setSelectedCourse] = useState(courseParam || "")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    preferredTimeSlot: "",
  })

  const selectedCourseData = useMemo(
    () => COURSES.find((c) => c.id === selectedCourse),
    [selectedCourse]
  )

  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data)
    setStep("payment")
  }

  const handlePaymentSuccess = (details: PaymentDetails) => {
    setPaymentDetails(details)
    setStep("success")
  }

  const handleBack = () => {
    setStep("form")
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-4">
              <Sparkles className="h-4 w-4" />
              Secure Online Registration
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              Register for Kandyan Dance Classes
            </h1>
            <p className="text-sm md:text-base text-neutral-700 max-w-2xl">
              Reserve your place in our classes in France. Complete the form, review your details, and securely
              confirm your enrollment.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex items-center gap-4">
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    step === "form"
                      ? "border-[#7B1129] bg-[#7B1129] text-white shadow-md shadow-[#7B1129]/40"
                      : "border-emerald-500 bg-emerald-500 text-white"
                  }`}
                >
                  {step !== "form" ? <Check className="h-5 w-5" /> : 1}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Step 1
                  </p>
                  <p className="text-sm font-medium text-neutral-800">Student Details</p>
                </div>
              </div>

              <div className="flex-1 h-[1px] bg-neutral-200" />

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    step === "payment"
                      ? "border-[#7B1129] bg-[#7B1129] text-white shadow-md shadow-[#7B1129]/40"
                      : step === "success"
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-neutral-200 bg-white text-neutral-400"
                  }`}
                >
                  {step === "success" ? <Check className="h-5 w-5" /> : 2}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Step 2
                  </p>
                  <p className="text-sm font-medium text-neutral-800">Payment & Confirmation</p>
                </div>
              </div>

              <div className="flex-1 h-[1px] bg-neutral-200" />

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    step === "success"
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/40"
                      : "border-neutral-200 bg-white text-neutral-400"
                  }`}
                >
                  {step === "success" ? <Check className="h-5 w-5" /> : 3}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Step 3
                  </p>
                  <p className="text-sm font-medium text-neutral-800">Receipt & Complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Left: Form / Payment / Success */}
            <div className="lg:col-span-2">
              {step === "form" ? (
                <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 md:p-8 shadow-lg shadow-black/5 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7B1129]/8">
                      <UserRound className="h-5 w-5 text-[#7B1129]" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
                        Tell us about the student
                      </h2>
                      <p className="text-xs md:text-sm text-neutral-600">
                        Your details help us tailor the right Kandyan dance experience for you in France.
                      </p>
                    </div>
                  </div>

                  <RegistrationForm
                    onSubmit={handleFormSubmit}
                    selectedCourse={selectedCourse}
                    onCourseChange={setSelectedCourse}
                  />
                </div>
              ) : step === "payment" ? (
                <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 md:p-8 shadow-lg shadow-black/5 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7B1129]/8">
                      <CreditCard className="h-5 w-5 text-[#7B1129]" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
                        Secure Payment
                      </h2>
                      <p className="text-xs md:text-sm text-neutral-600">
                        Complete your enrollment using our secure checkout. Your details are encrypted and protected.
                      </p>
                    </div>
                  </div>

                  {/* Course + student summary inline for small screens */}
                  {selectedCourseData && (
                    <div className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 md:hidden">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                        Summary
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-neutral-500">Course</span>
                          <span className="font-semibold text-neutral-900 text-right">
                            {selectedCourseData.name}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-neutral-500">Student</span>
                          <span className="font-semibold text-neutral-900 text-right">
                            {formData.fullName || "Not provided"}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-neutral-500">Email</span>
                          <span className="font-semibold text-neutral-900 text-right">
                            {formData.email || "Not provided"}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 pt-2 border-t border-neutral-200 mt-2">
                          <span className="text-neutral-500">Total</span>
                          <span className="font-bold text-[#7B1129] text-right">
                            € {(selectedCourseData.priceInCents / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Checkout Component */}
                  {selectedCourse ? (
                    <div className="mb-6">
                      <Checkout
                        productId={selectedCourse}
                        studentEmail={formData.email}
                        studentName={formData.fullName}
                        onPaymentSuccess={handlePaymentSuccess}
                      />
                    </div>
                  ) : (
                    <div className="mb-6 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 p-4 text-sm text-neutral-600">
                      Please go back and select a class to continue to payment.
                    </div>
                  )}

                  <button
                    onClick={handleBack}
                    className="w-full mt-4 px-6 py-3 rounded-full border-2 border-[#7B1129] text-[#7B1129] text-sm font-semibold transition-all duration-200 hover:bg-[#7B1129] hover:text-white"
                  >
                    ← Back to Form
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8 shadow-lg shadow-black/5 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                      <Check className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-emerald-900">
                        Registration Complete!
                      </h2>
                      <p className="text-xs md:text-sm text-emerald-700">
                        Your payment has been processed and your enrollment is confirmed.
                      </p>
                    </div>
                  </div>

                  {paymentDetails && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                          Enrollment Summary
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Student</span>
                            <span className="font-semibold text-neutral-900">{paymentDetails.studentName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Email</span>
                            <span className="font-semibold text-neutral-900">{paymentDetails.studentEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Course</span>
                            <span className="font-semibold text-neutral-900">{paymentDetails.courseName}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-neutral-200 mt-2">
                            <span className="text-neutral-600">Amount Paid</span>
                            <span className="font-bold text-emerald-600">
                              ${paymentDetails.amount.toFixed(2)} {paymentDetails.currency}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                        <p className="text-sm text-blue-900">
                          ✓ A confirmation email has been sent to{" "}
                          <span className="font-semibold">{paymentDetails.studentEmail}</span>
                        </p>
                        <p className="text-xs text-blue-700 mt-2">
                          Please check your inbox and spam folder for enrollment details, course schedules, and next steps.
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setStep("form")}
                    className="w-full mt-6 px-6 py-3 bg-[#7B1129] text-white rounded-full font-semibold transition-all duration-200 hover:bg-[#7B1129]/90"
                  >
                    Register Another Student
                  </button>
                </div>
              )}
            </div>

            {/* Right: Course summary & trust info */}
            <aside className="space-y-6">
              {/* Course Summary Card */}
              <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-md shadow-black/5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Selected Class
                </p>

                {selectedCourseData ? (
                  <>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      {selectedCourseData.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7B1129] mb-3">
                      {selectedCourseData.level || "Kandyan Dance · France"}
                    </p>
                    <p className="text-sm text-neutral-700 mb-4">
                      {selectedCourseData.description || "Authentic Kandyan dance training with experienced instructors."}
                    </p>

                    <div className="space-y-2 text-sm text-neutral-700 mb-4">
                      {selectedCourseData.duration && (
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Duration</span>
                          <span className="font-medium">{selectedCourseData.duration}</span>
                        </div>
                      )}
                      {selectedCourseData.schedule && (
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Schedule</span>
                          <span className="font-medium">{selectedCourseData.schedule}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          Total
                        </p>
                        <p className="text-xl font-bold bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                          € {(selectedCourseData.priceInCents / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right text-[11px] text-neutral-500">
                        <p>Includes full term tuition</p>
                        <p className="text-neutral-400">No hidden fees</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 p-4 text-sm text-neutral-600">
                    No class selected yet. Choose a class on the{" "}
                    <span className="font-semibold text-[#7B1129]">Classes</span> page or use the dropdown in the form.
                  </div>
                )}
              </div>

              {/* Trust / Info Card */}
              <div className="rounded-3xl border border-neutral-200 bg-white/90 p-5 shadow-md shadow-black/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7B1129]/10">
                    <Shield className="h-4 w-4 text-[#7B1129]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Safe & Secure</p>
                    <p className="text-[11px] text-neutral-500">
                      Payments handled with modern, encrypted processing.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-neutral-600">
                  <li className="flex gap-2">
                    <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[#7B1129]" />
                    Your data is used only for enrollment and communication.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[#7B1129]" />
                    You’ll receive a confirmation email once payment is complete.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[#7B1129]" />
                    For questions about schedules or payments, contact our team directly.
                  </li>
                </ul>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Registration usually takes less than 3 minutes.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default function Register() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#fdf5f7] to-white">
          <div className="relative flex flex-col items-center gap-4">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-4 border-[#7B1129]/15" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#7B1129] border-r-[#7B1129] animate-spin-slow" />
            </div>
            <p className="text-sm text-neutral-600">Loading registration...</p>
          </div>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  )
}
