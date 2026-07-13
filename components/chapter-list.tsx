'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'
import type { Book } from '@/lib/catalog'
import { NCERT_PDF_BASE } from '@/lib/catalog'

export function ChapterList({ book }: { book: Book }) {
  return (
    <section aria-label="Chapters" className="flex flex-col gap-2">
      <h2 className="text-sm font-extrabold uppercase tracking-widest">Chapters</h2>
      <ol className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {book.chapters.map((chapter) => (
          <li key={chapter.pdfCode} className="flex items-stretch">
            <Link
              href={`/read/${chapter.pdfCode}`}
              className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-bold text-secondary-foreground">
                {chapter.number}
              </span>
              <span className="min-w-0 truncate text-sm font-medium text-card-foreground">
                {chapter.title}
              </span>
            </Link>
            <a
              href={`${NCERT_PDF_BASE}/${chapter.pdfCode}.pdf`}
              download
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download ${chapter.title} PDF`}
              className="flex items-center px-4 text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <Download className="size-4" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
