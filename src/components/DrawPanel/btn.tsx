'use client'

import { cn } from '@/lib/utils'

export function DrawPanelBtn({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'text-white min-h-9 w-full justify-center sm:justify-start sm:w-auto bg-primary font-bold px-6 py-2 rounded-sm inline-flex items-center gap-2 shadow-float disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
