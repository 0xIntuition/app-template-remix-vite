import { cn } from '@/lib/utils/misc'
import * as React from 'react'

const SparkleIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-6 md:h-10', className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12C15.0556 12 12 15.0556 12 22C12 15.0556 8.94444 12 2 12C8.94444 12 12 8.94444 12 2C12 8.94444 15.0556 12 22 12Z"
      stroke="current"
      strokeWidth="1.5"
    />
  </svg>
))
export default SparkleIcon
