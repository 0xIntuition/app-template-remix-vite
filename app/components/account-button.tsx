import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/misc'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { LogOut } from 'lucide-react'
import type { User } from 'types/user'
import { baseSepolia } from 'viem/chains'
import { useSwitchChain } from 'wagmi'
import { NavLink } from '@remix-run/react'

interface AccountButtonProps {
  user?: User | null
  handleSignOut: () => void
  className?: string
}

export function AccountButton(props: AccountButtonProps) {
  const { user, handleSignOut, className } = props
  const { switchChain } = useSwitchChain()

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({
        // chainId: CURRENT_ENV === 'production' ? mainnet.id : baseSepolia.id, // change this back when we fully go to prod
        chainId: baseSepolia.id
      })
    }
  }

  return (
    <ConnectButton.Custom>
      {({
          account,
          chain,
          authenticationStatus,
          mounted
        }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')
        if (
          connected &&
          chain?.id !== baseSepolia.id
          // (CURRENT_ENV === 'production' ? mainnet.id : baseSepolia.id)
        ) {
          return (
            <Button
              variant="default"
              className={cn(className)}
              onClick={handleSwitch}
            >
              Wrong Network
            </Button>
          )
        }
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
          >
            {connected && !!user && (
              <div className="flex gap-2 rounded-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span>
                      <Button className={cn(className)}>
                        {user?.ensName ?? account?.displayName}
                      </Button>
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-popover">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <NavLink to={`/profile`} className="font-semibold">
                        <div className="space-y-1">
                          <div className="text-sm font-normal text-secondary-foreground">
                            Signed in as:
                          </div>

                          {account?.displayName}
                        </div>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault()
                        handleSignOut()
                      }}
                      className="cursor-pointer justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>
                        {user.didSession && 'Sign Out'}
                        {connected && !user.didSession && 'Disconnect'}
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
