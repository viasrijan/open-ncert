import type { Metadata } from 'next'
import { BookmarksView } from '@/components/bookmarks-view'

export const metadata: Metadata = {
  title: 'Saved Books',
  description: 'Your bookmarked NCERT textbooks.',
}

export default function BookmarksPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-white text-center">Saved books</h1>
      <BookmarksView />
    </div>
  )
}
