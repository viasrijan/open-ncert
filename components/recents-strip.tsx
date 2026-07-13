'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { getBook, toRoman } from '@/lib/catalog'
import { useRecents } from '@/lib/library-store'
import { assetPath } from '@/lib/utils'

export function RecentsStrip() {
  const { recents } = useRecents()
  if (recents.length === 0) return null

  return (
    <section aria-labelledby="recents-heading" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Clock className="size-4 text-muted-foreground" />
        <h2 id="recents-heading" className="text-sm font-extrabold uppercase tracking-widest">
          Continue reading
        </h2>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {recents.slice(0, 8).map((r) => {
          const book = getBook(r.bookId)
          if (!book) return null
          const chapter = book.chapters.find((c) => c.pdfCode === r.pdfCode)
          if (!chapter) return null
          return (
            <Link
              key={r.pdfCode}
              href={`/read/${r.pdfCode}`}
              className="flex w-56 shrink-0 items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={assetPath(book.cover || '/covers/general.png')} alt="" fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-card-foreground">
                  {chapter.title}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {book.title} · Class {toRoman(book.classNum)}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
