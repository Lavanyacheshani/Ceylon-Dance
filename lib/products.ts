export interface Course {
  id: string
  name: string
  description: string
  priceInCents: number
  level: string
  duration: string
  schedule: string
  maxStudents: number
}

export const COURSES: Course[] = [
  {
    id: "beginner",
    name: "Beginner Level",
    description: "Perfect for newcomers. Learn basic movements, rhythms, and fundamental techniques.",
    priceInCents: 4999,
    level: "Beginner",
    duration: "8 weeks",
    schedule: "Mon & Wed, 6:00 PM",
    maxStudents: 20,
  },
  {
    id: "intermediate",
    name: "Intermediate Level",
    description: "Build on basics. Master complex movements and traditional choreography.",
    priceInCents: 6999,
    level: "Intermediate",
    duration: "10 weeks",
    schedule: "Tue & Thu, 7:00 PM",
    maxStudents: 15,
  },
  {
    id: "advanced",
    name: "Advanced Level",
    description: "Expert training. Learn intricate techniques and prepare for performances.",
    priceInCents: 8999,
    level: "Advanced",
    duration: "12 weeks",
    schedule: "Sat & Sun, 10:00 AM",
    maxStudents: 12,
  },
  {
    id: "professional",
    name: "Professional Training",
    description: "Intensive program for aspiring professional dancers and performers.",
    priceInCents: 12999,
    level: "Professional",
    duration: "16 weeks",
    schedule: "Daily, 2:00 PM - 5:00 PM",
    maxStudents: 8,
  },
]
