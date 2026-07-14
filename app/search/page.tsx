import type { Metadata } from 'next'
import { SearchView } from '@/components/search-view'

export const metadata: Metadata = {
  title: 'Search Textbooks',
  description: 'Search NCERT textbooks by title, subject, or chapter.',
}

export default function SearchPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white text-center">Search</h1>
      <SearchView />
    </div>
  )
}
