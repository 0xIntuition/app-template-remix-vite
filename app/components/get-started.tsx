import { Button } from './ui/button'
import SparkleIcon from '@/assets/icons/sparkle-icon'
import BookIcon from '@/assets/icons/book-icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { cn } from '@/lib/utils/misc'

//TODO: Update Links
export default function GetStarted() {
  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="tracking-wide">
        <span className="opacity-70">Get started by editing </span>
        <span className="font-semibold text-green-500">/app/page.tsx</span>
      </div>
      <div className="flex items-center gap-8">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button size="lg-icon" variant="secondary" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <SparkleIcon className="stroke-current" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2">
              <div className="flex items-center justify-between gap-2">
                <span className={cn('text-primary-300')}>{'Examples'}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button size="lg-icon" variant="secondary" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <BookIcon className="stroke-current" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2">
              <div className="flex items-center justify-between gap-2">
                <span className={cn('text-primary-300')}>
                  {'Documentation'}
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
