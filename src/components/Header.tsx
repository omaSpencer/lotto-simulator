'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Icons } from './icons'

export const Header = () => {
  const pathname = usePathname()

  const activeClass =
    'border-b-2 border-foreground border-offset-1 text-foreground'

  const isActive = (path: string) => {
    return pathname === path ? activeClass : ''
  }

  return (
    <header className="gradient-header flex items-center justify-between">
      <div className="max-w-5xl w-full mx-auto px-5 py-4 max-h-[60px] overflow-hidden md:py-2 flex items-center justify-between gap-6 lg:gap-8">
        <div className="flex items-center gap-6 lg:gap-8">
          <Icons.LogoIcon />

          <h1 className="font-bold title-fSize text-white">
            Lottery Simulator
          </h1>
        </div>

        <nav>
          <ul className="flex items-center gap-3">
            <li>
              <Link href="/" className={cn(isActive('/'))}>
                SSE
              </Link>
            </li>
            <li>
              <Link href="/ws" className={cn(isActive('/ws'))}>
                WS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
