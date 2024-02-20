import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/misc'
import { Loader2Icon } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm shadow-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:text-primary-900 disabled:bg-primary-700 disabled:border-none transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        connect:
          'bg-primary-100 text-primary-950 hover:bg-primary-300 transition-colors duration-150 border rounded-full',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-primary-950 text-primary-500 hover:bg-black hover:text-primary-200 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-md hover:shadow-xl transition-all',
        ghost:
          'hover:bg-none hover:text-accent-foreground text-primary-300 transition-colors duration-150',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-4 py-2',
        sm: 'h-6 px-3',
        lg: 'h-10 px-8',
        icon: 'h-8 w-8',
        'lg-icon': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

/**
 * Provides an interactive element which users can click or tap to trigger an action.
 * The Button dynamically adjust its styles based on the provided props to ensure consistent,
 * accessible user interactions across the app
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-testid="int-button"
        {...props}
      >
        {isLoading ? (
          <Loader2Icon className={`${isLoading && 'animate-spin'} h-6 w-6`} />
        ) : (
          props.children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
