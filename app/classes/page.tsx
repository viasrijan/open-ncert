import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CLASSES, getBooksByClass, getSubjectsForClass, toRoman } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'All Classes',
  description: 'Browse NCERT textbooks for Classes I to XII.',
}

export default function ClassesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-sans text-xl font-extrabold uppercase tracking-widest md:text-2xl">
          All classes
        </h1>
        <p className="text-sm text-muted-foreground">
          Pick a class to see every textbook available for it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CLASSES.map((c) => {
          const books = getBooksByClass(c)
          const subjects = getSubjectsForClass(c)
          return (
            <Link
              key={c}
              href={`/classes/${c}`}
              className="group flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-card-foreground">
                  Class {toRoman(c)}
                </h2>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">
                {books.length} {books.length === 1 ? 'book' : 'books'} ·{' '}
                {subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'}
              </p>
              <p className="line-clamp-1 text-[11px] text-muted-foreground">
                {subjects.slice(0, 4).join(' · ')}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
