import { cn } from '@/lib/utils/misc'
import { ReactNode } from 'react'

export default function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(`flex-1 space-y-4 p-8 pt-6`, className)}>{children}</div>
  )
}
