import Avatar from '@/assets/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { User } from 'types/user'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { disconnect } from '@wagmi/core'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

interface AccountButtonProps {
  user?: User
  handleSignout: () => void
}

export const AccountButton = ({ user, handleSignout }: AccountButtonProps) => {
  const { isConnected } = useAccount()

  async function onSignout() {
    await disconnect()
    if (user) {
      handleSignout()
    }
  }

  useEffect(() => {
    if (!isConnected) {
      onSignout()
    }
  })

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')
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
            {!isConnected ? (
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={openConnectModal}
              >
                Connect
              </Button>
            ) : (
              <div className="flex gap-2 rounded-full p-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="text-xs">
                      {account?.ensName ?? account?.displayName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-primary-900 w-48"
                  >
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <Avatar className="h-6 w-6" />
                      {account?.displayName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="grid gap-2 focus:bg-transparent"
                      >
                        <div className="flex">
                          <Label>DID Session</Label>{' '}
                        </div>
                        <Input
                          value={`Bearer ${user.didSession}`}
                          readOnly
                          className="px-0"
                        />
                      </DropdownMenuItem>
                    )}
                    {user && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="grid gap-2 focus:bg-transparent"
                      >
                        <Label>API Key</Label>
                        <Input readOnly value={user.apikey} />
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault()
                        handleSignout()
                      }}
                      className="cursor-pointer justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>
                        {user && 'Sign Out'}
                        {connected && !user && 'Disconnect'}
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
