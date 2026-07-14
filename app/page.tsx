import Link from 'next/link'
import { ArrowRight, Library } from 'lucide-react'
import { BOOKS, CLASSES, toRoman } from '@/lib/catalog'
import { BookCard } from '@/components/book-card'
import { RecentsStrip } from '@/components/recents-strip'
import { SearchTrigger } from '@/components/search-trigger'

const FEATURED_IDS = ['jemh1', 'jesc1', 'lemh1', 'leph1', 'kebo1', 'jeff1', 'iemh1', 'hesc1']

export default function HomePage() {
  const featured = FEATURED_IDS.map((id) => BOOKS.find((b) => b.id === id)).filter(
    (b): b is NonNullable<typeof b> => Boolean(b),
  )
  const totalChapters = BOOKS.reduce((n, b) => n + b.chapters.length, 0)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-12 md:px-10 md:py-20">
      {/* Hero */}
      <section className="flex flex-col items-start gap-6 animate-fade-in-up">
        <div className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/70 px-5 py-2.5 text-[15px] font-bold text-muted-foreground backdrop-blur-sm">
          <Library className="size-[18px] text-coral" />
          <span>{BOOKS.length} textbooks</span>
          <span className="text-border">·</span>
          <span>{totalChapters.toLocaleString()} chapters</span>
        </div>

        <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl text-balance">
          Every NCERT textbook,{' '}
          <span className="bg-gradient-to-r from-coral via-teal to-indigo bg-clip-text text-transparent">
            beautifully
          </span>{' '}
          organized
        </h1>

        <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl text-pretty">
          Browse, read, and download official NCERT textbooks for Classes I to XII.
          Free, fast, and made for students.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 w-full max-w-xl">
          <SearchTrigger />
        </div>

        {/* Quick jump */}
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <span className="text-[15px] font-bold text-muted-foreground/50">Jump to:</span>
          {[6, 8, 10, 12].map((c) => (
            <Link
              key={c}
              href={`/classes/${c}`}
              className="rounded-full border border-border/50 bg-card px-4 py-2.5 text-[15px] font-bold text-muted-foreground transition-all duration-200 hover:border-coral/40 hover:text-coral hover:shadow-md hover:scale-105 active:scale-95"
            >
              Class {toRoman(c)}
            </Link>
          ))}
          <Link
            href="/classes"
            className="rounded-full border border-coral/30 bg-coral/5 px-4 py-2.5 text-[15px] font-bold text-coral transition-all duration-200 hover:bg-coral/10 hover:scale-105 active:scale-95"
          >
            All classes →
          </Link>
        </div>
      </section>

      <RecentsStrip />

      {/* Featured books */}
      <section aria-labelledby="featured-heading" className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 id="featured-heading" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Popular textbooks
          </h2>
          <Link
            href="/classes"
            className="group flex items-center gap-2 text-base font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            View all <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 stagger-children">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} showClass />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-5 rounded-3xl border border-border/30 bg-secondary/30 px-6 py-14 text-center md:py-16 animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-indigo text-white shadow-lg">
          <Library className="h-8 w-8" />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Ready to start reading?
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          Pick a class, search for a topic, or browse by subject — every NCERT textbook is just a tap away.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <Link
            href="/classes"
            className="rounded-2xl bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:scale-105 active:scale-[0.98]"
          >
            Browse classes
          </Link>
          <Link
            href="/search"
            className="rounded-2xl border-2 border-border bg-card px-7 py-4 text-base font-bold text-muted-foreground transition-all duration-200 hover:border-coral/40 hover:text-primary hover:shadow-md hover:scale-105 active:scale-[0.98]"
          >
            Search books
          </Link>
        </div>
      </section>
    </div>
  )
}
