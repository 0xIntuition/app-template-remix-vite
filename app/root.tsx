import { useNonce } from '@/lib/utils/nonce-provider'
import { RainbowKitProvider, darkTheme, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { chainalysisOracleAbi } from './lib/abis/chainalysisOracle'
import { WagmiProvider } from 'wagmi'
import { base, baseSepolia, mainnet } from 'viem/chains'
import type { Chain } from 'viem'
import { http } from 'viem'
import { phantomWallet, rabbyWallet } from '@rainbow-me/rainbowkit/wallets'
import { getEnv } from '@/.server/env'
import { isAuthedUser } from '@/lib/services/auth.server'
import { mainnetClient } from '@/lib/utils/viem'


import '@/styles/global.css'
import '@rainbow-me/rainbowkit/styles.css'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data
        ? 'Intuition App Template - Remix'
        : 'Error | Intuition App Template - Remix'
    },
    { name: 'description', content: `Start your Intuition journey.` }
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await isAuthedUser(request)

  const isSanctioned = user?.wallet
    ? ((await mainnetClient.readContract({
      address: '0x40C57923924B5c5c5455c48D93317139ADDaC8fb',
      abi: chainalysisOracleAbi,
      functionName: 'isSanctioned',
      args: [user.wallet],
    })) as boolean)
    : false

  return json({
    isSanctioned,
    user,
    ENV: getEnv()
  })
}

function Document({
                    children,
                    nonce,
                    env = {}
                  }: {
  children: React.ReactNode
  nonce: string
  theme?: string
  env?: Record<string, string>
}) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
    {children}
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  )
}


const queryClient = new QueryClient()

export default function App() {
  const { ENV: env } = useLoaderData<typeof loader>()
  const nonce = useNonce()
  const { wallets } = getDefaultWallets()

  const configAndChains = useMemo(() => {
    const testChains = [baseSepolia] // @TODO: Change this during the chains refactor since it's a different approach

    const chains: readonly [Chain, ...Chain[]] = [mainnet, ...testChains]

    const config = getDefaultConfig({
      appName: 'Intuition app template',
      projectId: env.WALLETCONNECT_PROJECT_ID!,
      chains,
      ssr: true,
      wallets: [
        ...wallets,
        {
          groupName: 'Other',
          wallets: [phantomWallet, rabbyWallet]
        }
      ], // Frame should already show up if it is installed
      transports: {
        [mainnet.id]: http(env.ALCHEMY_MAINNET_RPC_URL!),
        [baseSepolia.id]: http(env.ALCHEMY_BASE_SEPOLIA_RPC_URL!),
        [base.id]: http(env.ALCHEMY_BASE_RPC_URL!)
      }
    })

    return { config, chains }
  }, [wallets, env])

  return (
    <Document nonce={nonce} env={env}>
      {configAndChains.config && configAndChains.chains && (
        <WagmiProvider config={configAndChains.config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
              <div className="relative flex min-h-screen w-full flex-col justify-between antialiased">
                <div className="z-10 flex-1">
                  <Outlet />
                </div>
                <div
                  className="absolute inset-0 z-0 border-b border-slate-100/5 bg-bottom bg-grid-white/[0.05]"
                  style={{
                    maskImage:
                      'linear-gradient(to top left, transparent, black)',
                    WebkitMaskImage:
                      'linear-gradient(to top left, transparent, black)'
                  }}
                />
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      )}
    </Document>
  )
}
