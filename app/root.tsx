import { useNonce } from '@/lib/utils/nonce-provider'
import styles from '@/styles/global.css'

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import rainbowStylesUrl from '@rainbow-me/rainbowkit/styles.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
  MetaFunction,
  json,
  type DataFunctionArgs,
  type LinksFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import React, { useState } from 'react'
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: rainbowStylesUrl },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data
        ? 'Intuition App Template - Remix'
        : 'Error | Intuition App Template - Remix',
    },
    { name: 'description', content: `Start your Intuition journey.` },
  ]
}

export async function loader({ request }: DataFunctionArgs) {
  return json({
    ENV: {
      ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
      ALCHEMY_RPC_URL: process.env.ALCHEMY_RPC_URL,
      WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
    },
  })
}

function Document({
  children,
  nonce,
  env = {},
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
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()
  const nonce = useNonce()

  const [{ config, chains }] = useState(() => {
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [optimismSepolia, mainnet],
      [
        jsonRpcProvider({
          rpc: () => ({
            http: ENV.ALCHEMY_RPC_URL!,
          }),
        }),
      ],
    )

    const { connectors } = getDefaultWallets({
      appName: 'Intuition App Template - Remix',
      chains,
      projectId: ENV.WALLETCONNECT_PROJECT_ID!,
    })

    const config = createConfig({
      autoConnect: true,
      connectors,
      publicClient,
      webSocketPublicClient,
    })

    return {
      config,
      chains,
    }
  })

  return (
    <Document nonce={nonce} env={ENV}>
      {config && chains ? (
        <>
          <WagmiConfig config={config}>
            <RainbowKitProvider
              chains={chains}
              modalSize="compact"
              theme={darkTheme()}
            >
              <div className="relative flex min-h-screen w-full flex-col justify-between antialiased">
                <div className="z-10 flex-1">
                  <Outlet />
                </div>
                <div
                  className="bg-grid-white/[0.05] absolute inset-0 z-0 border-b border-slate-100/5 bg-bottom"
                  style={{
                    maskImage:
                      'linear-gradient(to top left, transparent, black)',
                    WebkitMaskImage:
                      'linear-gradient(to top left, transparent, black)',
                  }}
                />
              </div>
            </RainbowKitProvider>
          </WagmiConfig>
        </>
      ) : null}
    </Document>
  )
}
