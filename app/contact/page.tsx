"use client"

import type React from "react"
import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  UserRound,
  Send,
  Smartphone,
} from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    // Here you could integrate real-time chat or API in future
    setChatMessage("")
  }

  const whatsappNumber = "33612345678" // example France mobile number without + sign
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour! I would like to know more about Kandyan dance classes in France.",
  )}`

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-4">
              <MessageCircle className="h-4 w-4" />
              Contact · Kandyan Dance France
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              Contact & Chat With Us
            </h1>
            <p className="text-sm md:text-base text-neutral-700 max-w-2xl">
              Have questions about classes, schedules, or performances? Reach out to us, chat with a teacher, or send a
              quick WhatsApp message.
            </p>
          </section>

          {/* Top info strip */}
          <section className="mb-10">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <UserRound className="h-4 w-4 text-[#7B1129]" />
                <span>Speak directly with a Kandyan dance teacher in France</span>
              </div>
              <div className="hidden h-4 w-px bg-neutral-200 sm:block" />
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Clock className="h-4 w-4 text-black" />
                <span>Typical response time: under 24 hours</span>
              </div>
            </div>
          </section>

          {/* Main grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Left: Contact info + teacher availability */}
            <div className="space-y-8 lg:col-span-1">
              {/* Contact information */}
              <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-md shadow-black/5 backdrop-blur-sm">
                <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                  Contact Details
                </h2>
                <div className="space-y-5 text-sm">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#7B1129]/10">
                      <Mail className="h-4 w-4 text-[#7B1129]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Email
                      </h3>
                      <p className="text-neutral-700">info@kandyandance.fr</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#7B1129]/10">
                      <Phone className="h-4 w-4 text-[#7B1129]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Phone
                      </h3>
                      <p className="text-neutral-700">+33 6 12 34 56 78</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#7B1129]/10">
                      <MapPin className="h-4 w-4 text-[#7B1129]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Studio Locations
                      </h3>
                      <p className="text-neutral-700">
                        Paris · Lyon · Marseille, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teacher availability */}
              <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-md shadow-black/5 backdrop-blur-sm">
                <h2 className="mb-1 text-lg font-semibold text-neutral-900">
                  Teacher Availability
                </h2>
                <p className="mb-4 text-xs text-neutral-600">
                  Times are shown in Central European Time (CET).
                </p>
                <div className="space-y-3 text-xs">
                  {[
                    {
                      label: "Weekday Evenings · Online & Paris Studio",
                      time: "Mon – Fri · 18:00 – 21:00",
                    },
                    {
                      label: "Weekend Mornings · Group Classes",
                      time: "Sat – Sun · 09:30 – 12:30",
                    },
                    {
                      label: "Private Sessions (By Appointment)",
                      time: "Flexible · Online or In-studio",
                    },
                  ].map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 px-3 py-2"
                    >
                      <Clock className="mt-[2px] h-4 w-4 text-[#7B1129]" />
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {slot.label}
                        </p>
                        <p className="text-neutral-600">{slot.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp card */}
              <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-md shadow-black/5 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
                    <Smartphone className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">
                      Chat via WhatsApp
                    </h2>
                    <p className="text-[11px] text-neutral-600">
                      Quick questions, schedule checks, and class info.
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Contact form + Chat with teacher */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact form */}
              <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 md:p-8 shadow-lg shadow-black/5 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
                      Send Us a Message
                    </h2>
                    <p className="text-xs md:text-sm text-neutral-600">
                      Fill in the form and we’ll reply by email or phone as soon as possible.
                    </p>
                  </div>
                </div>

                {submitted && (
                  <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Thank you! Your message has been sent. We&apos;ll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-all duration-200 focus:border-[#7B1129] focus:ring-2 focus:ring-[#7B1129]/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-all duration-200 focus:border-[#7B1129] focus:ring-2 focus:ring-[#7B1129]/20"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-all duration-200 focus:border-[#7B1129] focus:ring-2 focus:ring-[#7B1129]/20"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition-all duration-200 focus:border-[#7B1129] focus:ring-2 focus:ring-[#7B1129]/20"
                      placeholder="Tell us about your level, city in France, and what you’re looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7B1129] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#7B1129]/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#911634]"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Chat with teacher */}
              <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-md shadow-black/5 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7B1129]/10">
                      <MessageCircle className="h-4 w-4 text-[#7B1129]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-neutral-900">
                        Chat with a Teacher (Beta)
                      </h2>
                      <p className="text-[11px] text-neutral-600">
                        Send a quick message to our teaching team. Ideal for fast questions.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsChatOpen((prev) => !prev)}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-600 hover:border-[#7B1129]/60 hover:text-[#7B1129] transition-colors"
                  >
                    {isChatOpen ? "Hide chat" : "Open chat"}
                  </button>
                </div>

                {isChatOpen && (
                  <form onSubmit={handleChatSend} className="space-y-3 text-xs">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Which level is right for me?",
                        "Do you have classes in Paris this month?",
                        "Can I join as a complete beginner?",
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setChatMessage(preset)}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] text-neutral-700 hover:border-[#7B1129]/50 hover:text-[#7B1129] transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <textarea
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        rows={2}
                        className="flex-1 resize-none rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-900 outline-none transition-all duration-200 focus:border-[#7B1129] focus:ring-2 focus:ring-[#7B1129]/20"
                        placeholder="Type your quick question for the teacher..."
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-[#7B1129] p-2 text-white shadow-md shadow-[#7B1129]/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#911634]"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-500">
                      This chat sends your question to our email/team. For real-time answers, use the WhatsApp button.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-xl shadow-emerald-500/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Teacher
      </a>

      <Footer />
    </>
  )
}
