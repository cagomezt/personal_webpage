import cvData from '../data/cv.json'
import { jsPDF } from 'jspdf'

export function generateMarkdownCV(): string {
  const { personalInfo, skills, experience, education } = cvData

  let md = `# ${personalInfo.name}\n`
  md += `**${personalInfo.title}**\n\n`
  md += `LinkedIn: ${personalInfo.contact.linkedin} | GitHub: ${personalInfo.contact.github}\n\n`
  md += `---\n\n`
  md += `## Professional Summary\n\n${personalInfo.summary}\n\n`

  md += `## Technical Skills\n\n`
  md += `**Programming:** ${skills.programming.join(', ')}\n\n`
  md += `**Frameworks:** ${skills.frameworks.join(', ')}\n\n`
  md += `**Data & Storage:** ${skills.dataStorage.join(', ')}\n\n`
  md += `**Cloud & DevOps:** ${skills.cloudDevops.join(', ')}\n\n`

  md += `## Professional Experience\n\n`
  experience.forEach((exp) => {
    md += `### ${exp.title}\n`
    md += `**${exp.company}** | ${exp.period}\n\n`
    exp.achievements.forEach((a) => {
      md += `- ${a}\n`
    })
    md += `\n*Tech: ${exp.tech.join(', ')}*\n\n`
  })

  md += `## Education\n\n`
  education.forEach((edu) => {
    md += `- **${edu.degree}** — ${edu.institution}, ${edu.year}\n`
  })

  return md
}

export function downloadMarkdown() {
  const content = generateMarkdownCV()
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Carlos_Gomez_CV.md'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function generatePDFCV() {
  const { personalInfo, skills, experience, education } = cvData
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 40
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Header - Name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(20, 40, 80)
  doc.text(personalInfo.name, margin, y + 8)
  y += 22

  // Title
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(80, 80, 80)
  doc.text(personalInfo.title, margin, y)
  y += 14

  // Links
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 200)
  doc.textWithLink('LinkedIn', margin, y, { url: personalInfo.contact.linkedin })
  doc.textWithLink('  |  GitHub', margin + 35, y, { url: personalInfo.contact.github })
  y += 16

  // Summary
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, pageWidth - margin, y)
  y += 12
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(60, 60, 60)
  const summaryLines = doc.splitTextToSize(personalInfo.summary, contentWidth)
  doc.text(summaryLines, margin, y)
  y += summaryLines.length * 10 + 8

  // Skills section
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(20, 40, 80)
  doc.text('TECHNICAL SKILLS', margin, y)
  y += 14
  doc.line(margin, y - 4, pageWidth - margin, y - 4)
  y += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(40, 40, 40)
  const skillsLines = [
    `Programming: ${skills.programming.join(', ')}`,
    `Frameworks: ${skills.frameworks.join(', ')}`,
    `Data & Storage: ${skills.dataStorage.join(', ')}`,
    `Cloud & DevOps: ${skills.cloudDevops.join(', ')}`,
  ]
  skillsLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, contentWidth)
    doc.text(wrapped, margin, y)
    y += wrapped.length * 10
  })
  y += 8

  // Experience section
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(20, 40, 80)
  doc.text('PROFESSIONAL EXPERIENCE', margin, y)
  y += 14
  doc.line(margin, y - 4, pageWidth - margin, y - 4)
  y += 6

  experience.forEach((exp, idx) => {
    // Check if we need a new page
    if (y > pageHeight - 80) return

    // Job title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(20, 40, 80)
    const titleLines = doc.splitTextToSize(`${exp.title} — ${exp.company}`, contentWidth)
    doc.text(titleLines, margin, y)
    y += titleLines.length * 11

    // Period
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(7.5)
    doc.setTextColor(120, 120, 120)
    doc.text(exp.period, margin, y)
    y += 10

    // Top achievements (limit to fit page)
    const maxAchievements = idx === 0 ? 4 : idx === 1 ? 2 : 2
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(40, 40, 40)

    exp.achievements.slice(0, maxAchievements).forEach((achievement) => {
      if (y > pageHeight - margin - 20) return
      const bulletText = `• ${achievement}`
      const lines = doc.splitTextToSize(bulletText, contentWidth - 4)
      doc.text(lines, margin + 2, y)
      y += lines.length * 9
    })
    y += 6
  })

  // Education (at bottom)
  if (y < pageHeight - 60) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(20, 40, 80)
    doc.text('EDUCATION', margin, y)
    y += 14
    doc.line(margin, y - 4, pageWidth - margin, y - 4)
    y += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(40, 40, 40)
    education.forEach((edu) => {
      if (y > pageHeight - margin) return
      const line = `${edu.degree} — ${edu.institution} (${edu.year})`
      const lines = doc.splitTextToSize(line, contentWidth)
      doc.text(lines, margin, y)
      y += lines.length * 10
    })
  }

  // Footer
  doc.setFontSize(7)
  doc.setTextColor(150, 150, 150)
  doc.text(
    'Generated from cagomezt.github.io/personal_webpage',
    margin,
    pageHeight - 15
  )

  // Save
  doc.save('Carlos_Gomez_CV.pdf')
}