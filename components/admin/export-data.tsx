"use client"

import { Download } from "lucide-react"

interface ExportDataProps {
  registrations: any[]
}

export default function ExportData({ registrations }: ExportDataProps) {
  const exportAsCSV = () => {
    const headers = ["Full Name", "Email", "Phone", "Age", "Course", "Time Slot", "Registration Date", "Status"]

    const rows = registrations.map((reg) => [
      reg.fullName,
      reg.email,
      reg.phone,
      reg.age,
      reg.courseName,
      reg.preferredTimeSlot,
      new Date(reg.date).toLocaleDateString(),
      reg.status || "confirmed",
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    downloadFile(csvContent, "text/csv", `registrations-${new Date().toISOString().split("T")[0]}.csv`)
  }

  const exportAsPDF = () => {
    const content = `
KANDYAN DANCE ACADEMY - REGISTRATION REPORT
Generated: ${new Date().toLocaleDateString()}

TOTAL REGISTRATIONS: ${registrations.length}

REGISTRATION DETAILS:
${registrations
  .map(
    (reg, idx) => `
${idx + 1}. ${reg.fullName}
   Email: ${reg.email}
   Phone: ${reg.phone}
   Course: ${reg.courseName}
   Date: ${new Date(reg.date).toLocaleDateString()}
`,
  )
  .join("\n")}
    `

    downloadFile(content, "text/plain", `registrations-${new Date().toISOString().split("T")[0]}.txt`)
  }

  const downloadFile = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={exportAsCSV}
        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        <Download size={20} />
        Export as CSV
      </button>
      <button
        onClick={exportAsPDF}
        className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
      >
        <Download size={20} />
        Export as PDF
      </button>
    </div>
  )
}
