import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/misc'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { LogOut } from 'lucide-react'
import type { User } from 'types/user'
import { optimismSepolia } from 'viem/chains'
import { useSwitchNetwork } from 'wagmi'
import { MetaMaskAvatar } from 'react-metamask-avatar'

interface AccountButtonProps {
  user?: User | null
  size?: 'sm' | 'default' | 'lg'
  handleSignOut: () => void
  className?: string
}

export function AccountButton({
  user,
  size = 'default',
  handleSignOut,
  className,
}: AccountButtonProps) {
  const { switchNetwork } = useSwitchNetwork()

  const handleSwitch = () => {
    if (switchNetwork) {
      switchNetwork(optimismSepolia.id)
    }
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        if (connected && chain?.id !== optimismSepolia.id) {
          return (
            <Button
              size={size}
              variant="outline"
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
                userSelect: 'none',
              },
            })}
          >
            {connected && !!user ? (
              <div className="flex gap-2 rounded-full p-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={'lg-icon'}
                      variant="ghost"
                      className={cn(
                        className,
                        'h-10 w-10 overflow-hidden rounded-full transition-transform hover:scale-105',
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <MetaMaskAvatar
                          address={account?.address || ''}
                          size={40}
                          className="rounded-full"
                        />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover w-48">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <div className="space-y-1">
                        <div className="text-sm font-normal text-primary-500">
                          Signed in as:
                        </div>
                        <div className="font-semibold">
                          {account?.displayName}
                        </div>
                      </div>
                    </DropdownMenuLabel>
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
            ) : null}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
