"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ShoppingCart, Star, Truck, X } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  inStock: boolean
}

export default function Shop() {
  const [cart, setCart] = useState<Product[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const products: Product[] = [
    // Costumes
    {
      id: "1",
      name: "Traditional Kandyan Dance Costume - Red",
      category: "Costumes",
      price: 149.99,
      image: "/15.jpg",
      description: "Authentic hand-crafted Kandyan dance costume in rich burgundy red with intricate gold embroidery.",
      inStock: true,
    },
    {
      id: "2",
      name: "Traditional Kandyan Dance Costume - Gold",
      category: "Costumes",
      price: 159.99,
      image: "/11.jpg",
      description: "Elegant gold-trimmed Kandyan costume with authentic beading and embellishments.",
      inStock: true,
    },

    // Hoodies
    {
      id: "6",
      name: "Kandyan Dance Hoodie - Classic",
      category: "Hoodies",
      price: 44.99,
      image: "/kandyan-dance-hoodie-classic.png",
      description: "Soft, breathable hoodie perfect for dance training.",
      inStock: true,
    },

    // Merchandise
    {
      id: "7",
      name: "Kandyan Dance Water Bottle",
      category: "Merchandise",
      price: 24.99,
      image: "/b.png",
      description: "Insulated steel water bottle with Ceylon Dancers branding.",
      inStock: true,
    },
    {
      id: "8",
      name: "Kandyan Dance T-Shirt",
      category: "Merchandise",
      price: 29.99,
      image: "/a.png",
      description: "Premium cotton t-shirt with artistic Kandyan dance design.",
      inStock: true,
    },

    // Items for Rent
    {
      id: "11",
      name: "Costume Rental - Beginner Set",
      category: "Rental",
      price: 25.0,
      image: "/30.jpg",
      description: "Affordable rental option for beginner dance classes (per month).",
      inStock: true,
    },
    {
      id: "12",
      name: "Costume Rental - Professional Set",
      category: "Rental",
      price: 45.0,
      image: "/16.jpg",
      description: "Premium costume rental for performances and advanced classes (per month).",
      inStock: true,
    },
  ]

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const addToCart = (product: Product) => {
    console.log("[v0] Adding to cart:", product.id, product.name)
    setCart((prevCart) => [...prevCart, product])
  }

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <Navigation />

      <main className="relative min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-20">
        {/* Decorative background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-[#7B1129]/10 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#7B1129]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-4 border border-[#7B1129]/15">
              <ShoppingCart className="h-4 w-4" />
              Official Shop
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                  Ceylon Dancers Shop
                </h1>
                <p className="text-lg text-neutral-700 max-w-3xl">
                  Authentic Kandyan dance costumes, cozy hoodies, and exclusive merchandise crafted for dancers and
                  enthusiasts.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-700">
                <div className="rounded-2xl bg-white/80 backdrop-blur border border-[#7B1129]/10 px-4 py-3 shadow-sm">
                  <p className="font-semibold text-[#7B1129]">Handcrafted Quality</p>
                  <p className="text-xs text-neutral-600 mt-1">
                    Trusted by dancers for performances, classes, and rehearsals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#7B1129] text-white border-[#7B1129] shadow-sm"
                      : "bg-white/80 text-neutral-700 border-neutral-200 hover:border-[#7B1129]/40 hover:bg-[#fdf5f7]"
                      }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
            <p className="text-xs sm:text-sm text-neutral-600">
              Showing <span className="font-semibold text-[#7B1129]">{filteredProducts.length}</span> items
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-neutral-200 bg-white/70 backdrop-blur p-10 text-center text-neutral-600 text-sm">
                  No products found in this category right now.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative rounded-2xl border border-neutral-200/80 bg-white/90 backdrop-blur shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-neutral-100 h-60">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute top-4 left-4 bg-white/90 text-[#7B1129] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                          {product.category}
                        </span>
                        {product.inStock ? (
                          <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[11px] font-semibold">
                            In Stock
                          </span>
                        ) : (
                          <span className="absolute top-4 right-4 bg-neutral-700 text-white px-3 py-1 rounded-full text-[11px] font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col h-[220px]">
                        <div className="mb-3">
                          <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2 group-hover:text-[#7B1129] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-neutral-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="mt-auto space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#7B1129]">
                              £{product.price.toFixed(2)}
                            </span>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className="fill-yellow-400 text-yellow-400 drop-shadow-[0_0_2px_rgba(0,0,0,0.2)]"
                                  />
                                ))}
                              </div>
                              <span className="text-[11px] text-neutral-500">Rated 5.0 by dancers</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart(product)
                              setShowCart(true)
                            }}
                            disabled={!product.inStock}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#7B1129] text-white text-sm font-semibold rounded-lg hover:bg-[#5a0820] active:scale-[0.98] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ShoppingCart size={16} />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[#7B1129]/10 bg-white/90 backdrop-blur shadow-[0_18px_40px_rgba(15,23,42,0.12)] p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <ShoppingCart size={24} className="text-[#7B1129]" />
                    Your Cart
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7B1129]/10 text-[#7B1129]">
                    {cart.length} item{cart.length !== 1 && "s"}
                  </span>
                </h2>

                {cart.length === 0 ? (
                  <p className="text-sm text-neutral-600 text-center py-8">
                    Your cart is empty.
                    <br />
                    Start by adding your favourite pieces.
                  </p>
                ) : (
                  <>
                    <div className="max-h-96 overflow-y-auto mb-4 space-y-3 border-b border-neutral-200 pb-4 pr-1">
                      {cart.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 items-start text-sm bg-neutral-50/80 border border-neutral-200/80 p-3 rounded-xl"
                        >
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-neutral-900 line-clamp-2 leading-snug">{item.name}</p>
                            <p className="text-[#7B1129] font-bold mt-0.5 text-sm">£{item.price.toFixed(2)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(idx)}
                            className="text-red-500 hover:text-red-700 ml-1 p-1 hover:bg-red-50 rounded-full cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="font-semibold text-neutral-900">£{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 flex items-center gap-1">
                          Shipping
                          <span className="text-[10px] uppercase tracking-wide bg-neutral-100 px-1.5 py-0.5 rounded-full">
                            Standard
                          </span>
                        </span>
                        <span className="font-semibold text-neutral-900">£9.99</span>
                      </div>
                      <div className="border-t border-neutral-200 pt-3 flex justify-between items-center">
                        <span className="font-bold text-neutral-900">Total</span>
                        <span className="text-lg font-bold text-[#7B1129]">
                          £{(cartTotal + (cart.length ? 9.99 : 0)).toFixed(2)}
                        </span>
                      </div>

                      <Link
                        href={`/shop/checkout?cart=${encodeURIComponent(JSON.stringify(cart))}`}
                        className="w-full py-3 bg-[#7B1129] text-white rounded-lg font-semibold hover:bg-[#5a0820] transition-colors text-center block cursor-pointer text-sm mt-1"
                      >
                        Proceed to Checkout
                      </Link>

                      <p className="text-[11px] text-neutral-500 text-center mt-1">
                        Secure checkout • No hidden fees
                      </p>
                    </div>

                    {/* Info */}
                    <div className="mt-6 pt-4 border-t border-neutral-200 space-y-3">
                      <div className="flex gap-2 text-xs text-neutral-600">
                        <Truck size={16} className="flex-shrink-0 text-[#7B1129] mt-0.5" />
                        <span>
                          Free shipping on orders over <span className="font-semibold text-neutral-900">£100</span>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cart Button - Mobile/Tablet */}
        <button
          type="button"
          onClick={() => setShowCart(true)}
          className="fixed z-30 bottom-6 right-4 sm:right-6 lg:hidden inline-flex items-center gap-2 rounded-full bg-[#7B1129] text-white px-5 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.35)] active:scale-95 transition-transform cursor-pointer"
        >
          <ShoppingCart size={18} />
          <span className="text-sm font-semibold">Cart</span>
          {cart.length > 0 && (
            <span className="ml-1 text-xs font-bold bg-white text-[#7B1129] rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>

        {/* Mobile Cart Drawer */}
        {showCart && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowCart(false)}
            />
            <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingCart size={20} className="text-[#7B1129]" />
                  Your Cart
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7B1129]/10 text-[#7B1129]">
                    {cart.length} item{cart.length !== 1 && "s"}
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-sm text-neutral-600 text-center py-8">
                    Your cart is empty. Add items from the shop to see them here.
                  </p>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 items-start text-sm bg-neutral-50 border border-neutral-200 p-3 rounded-xl"
                    >
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900 line-clamp-2 leading-snug">{item.name}</p>
                        <p className="text-[#7B1129] font-bold mt-0.5 text-sm">£{item.price.toFixed(2)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(idx)}
                        className="text-red-500 hover:text-red-700 ml-1 p-1 hover:bg-red-50 rounded-full cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-neutral-200 px-5 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold text-neutral-900">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-semibold text-neutral-900">£9.99</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-neutral-200 pt-3">
                    <span className="font-bold text-neutral-900">Total</span>
                    <span className="text-lg font-bold text-[#7B1129]">
                      £{(cartTotal + 9.99).toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href={`/shop/checkout?cart=${encodeURIComponent(JSON.stringify(cart))}`}
                    className="w-full py-3 bg-[#7B1129] text-white rounded-lg font-semibold hover:bg-[#5a0820] transition-colors text-center block cursor-pointer text-sm"
                    onClick={() => setShowCart(false)}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
