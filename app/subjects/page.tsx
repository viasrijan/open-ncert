import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllSubjects, getBooksBySubject } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'All Subjects',
  description: 'Browse NCERT textbooks by subject.',
}

export default function SubjectsPage() {
  const subjects = getAllSubjects()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12 md:px-8 md:py-16">
      <div className="flex flex-col items-center text-center gap-2 animate-fade-in-up">
        <h1 className="font-display text-6xl font-bold tracking-tight md:text-7xl text-foreground">All subjects</h1>
        <p className="text-lg text-muted-foreground">Pick a subject to see every textbook available for it.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {subjects.map((subject) => {
          const books = getBooksBySubject(subject)
          return (
            <Link
              key={subject}
              href={`/subjects/${encodeURIComponent(subject)}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm p-5 shadow-card transition-colors duration-200 hover:border-gold/30 hover:shadow-elevated"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold bg-transparent transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                {subject.charAt(0)}
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <h2 className="font-display text-xl font-bold text-foreground">{subject}</h2>
                <p className="text-[14px] font-semibold text-muted-foreground">
                  <span className="text-gold">{books.length}</span> {books.length === 1 ? 'book' : 'books'}
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-gold" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
