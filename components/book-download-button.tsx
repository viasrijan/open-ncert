'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

const JD_BASES = [
  'https://cdn.jsdelivr.net/gh/viasrijan/ncert-pdfs-1@main',
  'https://cdn.jsdelivr.net/gh/viasrijan/ncert-pdfs-2@main',
  'https://cdn.jsdelivr.net/gh/viasrijan/ncert-pdfs-3@main',
  'https://cdn.jsdelivr.net/gh/viasrijan/ncert-pdfs-4@main',
]
const PROXY_BASE = 'https://ncert-pdf-proxy.srijan-pratap1998.workers.dev'

async function resolvePdfUrl(file: string): Promise<string> {
  for (const base of JD_BASES) {
    const candidate = `${base}/${file}`
    try {
      const res = await fetch(candidate, { method: 'HEAD' })
      if (res.ok) return candidate
    } catch {
      // try next mirror
    }
  }
  return `${PROXY_BASE}/pdf/${file}`
}

export function BookDownloadButton({ pdfCode, label }: { pdfCode: string; label: string }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    const file = `${pdfCode}.pdf`
    setDownloading(true)
    try {
      const url = await resolvePdfUrl(file)
      const res = await fetch(url)
      const blob = await res.blob()
      const objUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objUrl
      a.download = file
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objUrl)
    } catch {
      window.open(`https://ncert.nic.in/textbook/pdf/${file}`, '_blank', 'noopener,noreferrer')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-1.5 rounded-xl bg-card/80 px-4 py-3 text-[14px] font-bold text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:text-foreground hover:shadow-sm disabled:opacity-50"
    >
      <Download className="size-[16px]" /> {downloading ? 'Preparing…' : label}
    </button>
  )
}
