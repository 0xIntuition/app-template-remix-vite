import { Link, useFetcher } from '@remix-run/react'
import { AccountButton } from '@/components/account-button'
import IntuitionLogotype from '@/assets/intuition-logotype'
import { useDisconnect } from 'wagmi'

export default function Header() {
  const { disconnect } = useDisconnect()
  const fetcher = useFetcher<{
    didSessionError?: string
    apikeyError?: string
    apikey?: string
  } | null>()

  async function handleSignout() {
    disconnect()
    fetcher.submit({}, { method: 'post', action: '/action/auth/logout' })
  }
  return (
    <div className="w-full max-w-7xl items-start justify-between lg:flex">
      <div className="space-y-6 max-lg:flex max-lg:flex-col max-lg:items-center">
        <Link to="/app">
          <IntuitionLogotype className="h-10" />
        </Link>
      </div>
      <div className="mt-4 flex flex-col items-end gap-4 max-lg:items-center max-lg:justify-center">
        <AccountButton handleSignout={handleSignout} />
      </div>
    </div>
  )
}
