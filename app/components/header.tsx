import { Link, useFetcher } from '@remix-run/react'
import IntuitionLogotype from '@/assets/intuition-logotype'
import { useDisconnect } from 'wagmi'
import templateBadge from '../../src/images/template-badge.png'
import { AccountButton } from './account-button'
import { User } from 'types/user'

export interface HeaderProps {
  user: User | null
}

export default function Header({ user }: HeaderProps) {
  const fetcher = useFetcher()
  const { disconnect } = useDisconnect()

  async function handleSignout() {
    disconnect()
    fetcher.submit({}, { method: 'post', action: '/actions/auth/logout' })
  }
  return (
    <div className="flex w-full max-w-7xl items-center justify-between">
      <div>
        <Link to="/">
          <div className="flex items-center gap-4">
            <IntuitionLogotype />
            <img
              src={templateBadge}
              alt="Intuition App Template"
              className="h-6 w-auto shadow-md"
            />
          </div>
        </Link>
      </div>
      <div className="h-12">
        {user?.wallet ? (
          <AccountButton handleSignOut={handleSignout} user={user} size="lg" />
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
