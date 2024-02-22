import { useEffect, useState } from 'react'
import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunction, json } from '@remix-run/node'
import { DIDSession } from 'did-session'
import { makeDomainFunction } from 'domain-functions'
import { optimismSepolia } from 'viem/chains'
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi'
import { z } from 'zod'
import { ConnectButton } from '@/components/connect-button'
import Header from '@/components/header'
import { Card } from '@/components/ui/card'
import { isAuthedUser, login } from '@/lib/services/auth.server'
import { formAction } from '@/lib/services/form.server'
import { newDIDSessionFromWalletClient } from '@/lib/utils/siwe'
import templateAppIcon from '../../src/images/app-template-logo.png'
import { User } from 'types/user'
import GetStarted from '@/components/get-started'

const schema = z.object({
  didSession: z.string(),
  wallet: z.string(),
})
const mutation = makeDomainFunction(schema)(async (values) => {
  return values
})

interface FetcherData {
  didSessionError?: string
  user?: User
  token?: string
  refreshToken?: string
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const resp = await formAction({
    request,
    schema,
    mutation,
  })
  if (resp.ok) {
    await login(request)
  }
  return null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthedUser(request)
  const url = new URL(request.url)
  const didSession = url.searchParams.get('didSession')

  if (didSession) {
    const session = await DIDSession.fromSession(didSession)
    if (session === null || session === undefined) {
      return json({ didSessionError: 'Invalid DID Session' })
    }

    const apiUrl = process.env.API_URL
    const apiKey = process.env.API_KEY

    const resp = await fetch(`${apiUrl}/auth?didSession=${didSession}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey ?? '',
      },
      body: JSON.stringify({
        didSession,
      }),
    })
    const data = await resp.json()
    const { token, refreshToken } = data

    if (token === null || token === undefined) {
      return json({ authTokenError: 'Invalid auth token' })
    }

    return json({ user, token, refreshToken })
  }

  return json({ user })
}

export default function LoginIndexRoute() {
  const { user } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<FetcherData>()
  const submit = useSubmit()

  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()
  const { data: walletClient } = useWalletClient()

  const [hasSigned, setHasSigned] = useState<boolean>(false)
  const [didSession, setDidSession] = useState<string>('')

  async function signMessage() {
    try {
      if (walletClient) {
        const didSesh = await newDIDSessionFromWalletClient({
          account: walletClient?.account,
          signMessage: walletClient?.signMessage,
        })
        setDidSession(didSesh.serialize())
        setHasSigned(true)
        fetcher.load(`/login?index&didSession=${didSesh.serialize()}`)
      }
    } catch (e) {
      window.alert(e)
      disconnect()
      fetcher.submit({}, { method: 'post', action: '/actions/auth/logout' })
    }
  }

  async function handleSignOut() {
    setHasSigned(false)
    disconnect()
    fetcher.submit({}, { method: 'post', action: '/actions/auth/logout' })
  }
  function handleLogin() {
    let formData = new FormData()
    formData.set('didSession', didSession)
    formData.set('wallet', walletClient?.account?.address as string)
    submit(formData, {
      method: 'post',
    })
  }

  useEffect(() => {
    if (!user && isConnected && walletClient?.account.address) {
      signMessage()
    }
    if (!isConnected || (isConnected && user && user.wallet !== address)) {
      if (isConnected) handleSignOut()
    }
  }, [user, isConnected, walletClient])

  // Detect Wrong Network
  useEffect(() => {
    if (chain !== optimismSepolia && switchNetwork) {
      switchNetwork(optimismSepolia.id)
    }
  }, [chain, switchNetwork])

  // Trigger remix auth action if user has a did session and has signed
  useEffect(() => {
    if (hasSigned && didSession) {
      handleLogin()
    }
  }, [hasSigned, didSession])

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-12 p-8">
      <Header user={user} />
      <div className="mt-32 flex h-full w-full flex-col items-center gap-8">
        <Card className="flex w-[92vw] max-w-[728px] flex-col items-center gap-8 p-16 text-center">
          <img src={templateAppIcon} className="h-24 w-24" />
          <div className="space-y-4">
            <h4 className="text-3xl font-semibold leading-none">
              Sign in to Intuition
            </h4>
            <div className="opacity-70">Connect your wallet to get started</div>
          </div>
          <ConnectButton size="lg" user={user} />
        </Card>
        <GetStarted />
      </div>
    </main>
  )
}
