'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function SearchTrigger() {
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        router.push('/search')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  return (
    <button
      type="button"
      onClick={() => router.push('/search')}
      className="flex w-full max-w-3xl items-center gap-3 rounded-full bg-card/80 px-5 py-4 text-left text-base text-muted-foreground backdrop-blur-sm shadow-card transition-colors duration-200 hover:shadow-elevated"
    >
      <Search className="size-5 shrink-0" />
      <span className="flex-1 font-semibold">Search books and chapters...</span>
      <kbd className="hidden rounded-xl bg-secondary px-3 py-2 font-mono text-sm font-bold text-muted-foreground md:inline-block">
        ⌘K
      </kbd>
    </button>
  )
}
