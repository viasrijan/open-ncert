'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Bookmark, GraduationCap, Home, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn, assetPath } from '@/lib/utils'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/classes', label: 'Classes', icon: GraduationCap },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/bookmarks', label: 'Saved', icon: Bookmark },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/read/')) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-svh">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-svh w-80 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-8 pb-6">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src={assetPath('/apple-icon.png')}
                alt="Open NCERT"
                width={48}
                height={48}
                className="h-12 w-12 object-cover"
              />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-[26px] font-extrabold tracking-tight text-sidebar-foreground leading-none">
                Open NCERT
              </span>
              <span className="mt-0.5 text-[11px] font-bold tracking-[0.2em] text-sidebar-foreground/35 uppercase">
                Digital Library
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav aria-label="Main" className="flex flex-col gap-0.5 px-4">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'group flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-[17px] font-bold transition-all duration-200',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                    : 'text-sidebar-foreground/45 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                )}
              >
                <Icon className={cn(
                  'h-5 w-5 transition-transform duration-200',
                  active ? 'text-sidebar-primary' : 'group-hover:scale-110',
                )} />
                {label}
                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-coral" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Class grid */}
        <div className="mt-6 flex-1 overflow-y-auto px-4 pb-4">
          <p className="mb-3.5 px-4 text-[10px] font-bold tracking-[0.25em] text-sidebar-foreground/30 uppercase">
            Browse classes
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {ROMAN.map((r, i) => {
              const href = `/classes/${i + 1}`
              const active = isActive(pathname, href)
              return (
                <Link
                  key={r}
                  href={href}
                  className={cn(
                    'flex h-11 items-center justify-center rounded-xl text-[14px] font-extrabold transition-all duration-200',
                    active
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md scale-105'
                      : 'bg-sidebar-accent/30 text-sidebar-foreground/40 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground hover:scale-105',
                  )}
                >
                  {r}
                </Link>
              )
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-sidebar-border/40 bg-sidebar-accent/20 p-5">
            <p className="text-[12px] font-semibold leading-relaxed text-sidebar-foreground/45">
              138 textbooks from NCERT, free and open for everyone.
            </p>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between border-t border-sidebar-border px-5 py-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sidebar-foreground/35 uppercase">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3.5 backdrop-blur-xl md:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-sm">
              <Image
                src={assetPath('/apple-icon.png')}
                alt="Open NCERT"
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Open NCERT
            </span>
          </Link>
          <ThemeToggle />
        </header>

        <main className="flex-1 pb-28 md:pb-0">{children}</main>

        {/* Desktop footer */}
        <footer className="hidden border-t border-border bg-secondary/30 px-6 py-5 md:flex md:items-center md:justify-between">
          <p className="text-[13px] font-medium text-muted-foreground">
            All textbooks &copy; NCERT.{' '}
            <a
              href="https://ncert.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary underline underline-offset-2 decoration-coral/40 transition-colors hover:text-coral"
            >
              ncert.nic.in
            </a>
            {' '}— Unofficial reading companion.
          </p>
          <p className="text-[13px] font-bold tracking-wide text-muted-foreground/40">
            Open NCERT
          </p>
        </footer>

        {/* Mobile bottom nav */}
        <nav
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1.5 pt-3.5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-[12px] font-bold tracking-tight transition-all duration-200',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className={cn(
                  'h-6 w-6 transition-transform duration-200',
                  active && 'scale-110',
                )} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
