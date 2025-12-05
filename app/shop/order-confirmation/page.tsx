"use client"

import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

export default function OrderConfirmation() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-16 flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-lg text-neutral-700 mb-2">Thank you for your purchase from Ceylon Dancers.</p>
            <p className="text-neutral-600">A confirmation email has been sent to your email address.</p>
          </div>

          {/* Order Details Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Package size={32} className="text-[#7B1129] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your order is being prepared</h2>
                <p className="text-neutral-600">
                  We'll ship your items within 2-3 business days. You can track your order using the tracking number
                  sent to your email.
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Order Number</span>
                <span className="font-semibold text-neutral-900">
                  #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Order Date</span>
                <span className="font-semibold text-neutral-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Estimated Delivery</span>
                <span className="font-semibold text-neutral-900">5-7 business days</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#7B1129] text-white rounded-lg font-semibold hover:bg-[#5a0820] transition-colors"
            >
              Continue Shopping
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#7B1129] text-[#7B1129] rounded-lg font-semibold hover:bg-[#7B1129] hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
