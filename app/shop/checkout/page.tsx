"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Lock, CheckCircle, AlertCircle } from "lucide-react"

export default function ShopCheckout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Get cart from URL params
  const cartJson = searchParams.get("cart")
  const cart = cartJson ? JSON.parse(decodeURIComponent(cartJson)) : []
  const cartTotal = cart.reduce((sum: number, item: any) => sum + item.price, 0)
  const shippingCost = 9.99
  const totalAmount = cartTotal + shippingCost

  const handleCheckout = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: totalAmount,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to process payment. Please try again.")
      console.log("[v0] Checkout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AlertCircle size={48} className="mx-auto text-[#7B1129] mb-4" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-neutral-600 mb-8">Please add items to your cart before checking out.</p>
            <button
              onClick={() => router.push("/shop")}
              className="px-8 py-3 bg-[#7B1129] text-white rounded-lg font-semibold hover:bg-[#5a0820]"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              Secure Checkout
            </h1>
            <p className="text-lg text-neutral-700 flex items-center justify-center gap-2">
              <Lock size={20} className="text-[#7B1129]" />
              Your payment is secured with Stripe
            </p>
          </div>

          {/* Error Message */}
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 border-b border-neutral-200 pb-6">
                  {cart.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-neutral-900">{item.name}</p>
                        <p className="text-sm text-neutral-600">{item.category}</p>
                      </div>
                      <p className="font-semibold text-neutral-900">£{item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-semibold">£{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="text-[#7B1129] font-bold">£{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-4 bg-[#7B1129] text-white rounded-lg font-bold text-lg hover:bg-[#5a0820] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg p-8 h-fit">
              <h3 className="font-bold mb-4">Why Shop with Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">SSL Secure</p>
                    <p className="text-xs text-neutral-600">Encrypted payments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Money Back Guarantee</p>
                    <p className="text-xs text-neutral-600">30 day returns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">24/7 Support</p>
                    <p className="text-xs text-neutral-600">Help when you need it</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
