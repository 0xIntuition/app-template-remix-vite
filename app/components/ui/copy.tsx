import { cn } from '@/lib/utils/misc'
import { CheckIcon, CopyCheck, Copy as CopyIcon } from 'lucide-react'
import React from 'react'

export interface CopyProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

const Copy = React.forwardRef<HTMLButtonElement, CopyProps>(
  ({ className, ...props }, ref) => {
    const { text } = props
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(text)
      if (!copied) {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      }
    }

    return !copied ? (
      <CopyIcon
        className={cn(
          'hover:text-primary-400 h-4 w-4 cursor-pointer',
          className,
        )}
        onClick={() => {
          handleCopy()
        }}
      />
    ) : (
      <CopyCheck className={cn('h-4 w-4 text-success-600', className)} />
    )
  },
)

export { Copy }
