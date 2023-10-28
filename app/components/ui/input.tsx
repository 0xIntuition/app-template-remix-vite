import { cn } from '@/lib/utils/misc'
import { forwardRef } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: React.ReactNode
  startAdornment?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div
        className={cn(
          `flex rounded-md border border-border bg-background ${
            startAdornment && 'pl-1'
          } ${endAdornment && 'pr-2'}`,
          className,
        )}
      >
        {!!startAdornment && (
          <div className="m-auto flex items-center p-1">{startAdornment}</div>
        )}
        <input
          type={type}
          className="focus-visible:ring-ring flex h-8 w-full rounded-md bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />

        {!!endAdornment && (
          <div className="m-auto flex items-center p-1">{endAdornment}</div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
