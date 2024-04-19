import { Button } from '@/components/ui/button'
import { ConnectButton as RainbowkitConnectButton } from '@rainbow-me/rainbowkit'
import { type Cookie } from '@remix-run/node'
import { type User } from 'types/user'
import { baseSepolia } from 'viem/chains'
import { useSwitchChain } from 'wagmi'

interface ConnectButtonProps {
  user?: User | null
  className?: string
  tosCookie?: Cookie
  setShowTOSModal?: (value: boolean) => void
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const { user, className, tosCookie, setShowTOSModal } = props
  const { switchChain } = useSwitchChain()

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({
        // chainId: CURRENT_ENV === 'production' ? mainnet.id : baseSepolia.id,
        chainId: baseSepolia.id,
      })
    }
  }

  return (
    <RainbowkitConnectButton.Custom>
      {({
          account,
          chain,
          openConnectModal,
          openAccountModal,
          authenticationStatus,
          mounted,
        }) => {
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
            {!connected ? (
              <Button
                className={className}
                variant="connect"
                onClick={
                  tosCookie
                    ? openConnectModal
                    : () => setShowTOSModal && setShowTOSModal(true)
                }
              >
                Connect Wallet
              </Button>
            ) : !user?.didSession ? (
              <Button className={className}>
                Signing...
              </Button>
            ) : chain?.id !== baseSepolia.id ? (
              // (CURRENT_ENV === 'production' ? mainnet.id : baseSepolia.id) ? ( // add this back in when we fully go to prod
              <Button className={className} onClick={handleSwitch}>
                Wrong Network
              </Button>
            ) : (
              <Button className={className} onClick={openAccountModal}>
                {user?.ensName ?? account?.displayName}
              </Button>
            )}
          </div>
        )
      }}
    </RainbowkitConnectButton.Custom>
  )
}
