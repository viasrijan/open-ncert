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
      className="flex w-full max-w-lg items-center gap-3.5 rounded-2xl border-2 border-border/60 bg-card px-5 py-4.5 text-left text-lg text-muted-foreground transition-all duration-200 hover:border-coral/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground/50" />
      <span className="flex-1 font-semibold">Search books and chapters...</span>
      <kbd className="hidden rounded-xl border border-border/50 bg-secondary px-3 py-1.5 font-mono text-[13px] font-bold text-muted-foreground md:inline-block">
        ⌘K
      </kbd>
    </button>
  )
}
