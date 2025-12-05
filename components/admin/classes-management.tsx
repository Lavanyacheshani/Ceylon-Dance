"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { COURSES } from "@/lib/products"

interface Course {
  id: string
  name: string
  level: string
  duration: string
  schedule: string
  priceInCents: number
  maxStudents: number
}

export default function ClassesManagement() {
  const [courses, setCourses] = useState<Course[]>(COURSES)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    duration: "",
    schedule: "",
    priceInCents: 0,
    maxStudents: 0,
  })

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      name: "",
      level: "",
      duration: "",
      schedule: "",
      priceInCents: 0,
      maxStudents: 0,
    })
    setShowForm(true)
  }

  const handleEdit = (course: Course) => {
    setEditingId(course.id)
    setFormData({
      name: course.name,
      level: course.level,
      duration: course.duration,
      schedule: course.schedule,
      priceInCents: course.priceInCents,
      maxStudents: course.maxStudents,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setCourses(courses.map((c) => (c.id === editingId ? { ...c, ...formData } : c)))
    } else {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        ...formData,
      }
      setCourses([...courses, newCourse])
    }
    setShowForm(false)
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Manage Classes</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add New Class
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
                <p className="text-sm text-foreground/70">{course.level}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 size={18} className="text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Duration:</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Schedule:</span>
                <span className="font-semibold">{course.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Price:</span>
                <span className="font-semibold">${(course.priceInCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Max Students:</span>
                <span className="font-semibold">{course.maxStudents}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Class" : "Add New Class"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Class Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Level</label>
                <input
                  type="text"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Schedule</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="e.g., Mon & Wed, 6:00 PM"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Price ($)</label>
                <input
                  type="number"
                  value={formData.priceInCents / 100}
                  onChange={(e) =>
                    setFormData({ ...formData, priceInCents: Math.round(Number.parseFloat(e.target.value) * 100) })
                  }
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Max Students</label>
                <input
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => setFormData({ ...formData, maxStudents: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
