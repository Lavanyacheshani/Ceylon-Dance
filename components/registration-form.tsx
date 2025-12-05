"use client"

import type React from "react"

import { useState } from "react"
import { COURSES } from "@/lib/products"

interface RegistrationFormProps {
  onSubmit: (data: {
    fullName: string
    email: string
    phone: string
    age: string
    preferredTimeSlot: string
  }) => void
  selectedCourse: string
  onCourseChange: (courseId: string) => void
}

export default function RegistrationForm({ onSubmit, selectedCourse, onCourseChange }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    preferredTimeSlot: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.age) newErrors.age = "Age is required"
    if (!selectedCourse) newErrors.course = "Please select a course"
    if (!formData.preferredTimeSlot) newErrors.preferredTimeSlot = "Please select a time slot"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      {/* Course Selection */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-4 text-foreground">Select Your Course *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSES.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => onCourseChange(course.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCourse === course.id ? "border-primary bg-primary/10" : "border-border hover:border-primary"
              }`}
            >
              <div className="font-bold">{course.name}</div>
              <div className="text-sm text-foreground/70">${(course.priceInCents / 100).toFixed(2)}</div>
              <div className="text-sm text-foreground/60">{course.duration}</div>
            </button>
          ))}
        </div>
        {errors.course && <p className="text-red-500 text-sm mt-2">{errors.course}</p>}
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6 text-foreground">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.fullName ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.phone ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="+94 123 456 789"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-semibold mb-2">
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.age ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="18"
              min="5"
              max="120"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
        </div>
      </div>

      {/* Schedule Preference */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-foreground">Schedule Preference</h3>
        <label htmlFor="preferredTimeSlot" className="block text-sm font-semibold mb-2">
          Preferred Time Slot *
        </label>
        <select
          id="preferredTimeSlot"
          name="preferredTimeSlot"
          value={formData.preferredTimeSlot}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
            errors.preferredTimeSlot ? "border-red-500" : "border-border focus:border-primary"
          }`}
        >
          <option value="">Select a time slot</option>
          <option value="morning">Morning (6:00 AM - 9:00 AM)</option>
          <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
          <option value="evening">Evening (6:00 PM - 9:00 PM)</option>
          <option value="weekend">Weekend (10:00 AM - 1:00 PM)</option>
        </select>
        {errors.preferredTimeSlot && <p className="text-red-500 text-sm mt-1">{errors.preferredTimeSlot}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  )
}
