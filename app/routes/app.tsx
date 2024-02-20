import { Outlet, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { requireAuthedUser } from '@/lib/services/auth.server'
import { User } from 'types/user'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await requireAuthedUser(request)) as User
  return json({
    authedWallet: user.wallet as `0x${string}`,
  })
}

export default function AppLayout() {
  const { authedWallet } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  const { isConnected, address } = useAccount()

  useEffect(() => {
    if (!isConnected || address !== authedWallet) {
      disconnect()
      fetcher.submit({}, { method: 'post', action: '/actions/auth/logout' })
    }
  }, [isConnected, address])

  return (
    <>
      <Outlet />
    </>
  )
}
