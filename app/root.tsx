import { useNonce } from '@/lib/utils/nonce-provider'
import intuitionTheme from '@/lib/utils/rainbow-theme'
import styles from '@/styles/global.css'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
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
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { arbitrumGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'

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
      [arbitrumGoerli],
      [alchemyProvider({ apiKey: ENV.ALCHEMY_API_KEY! })],
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
              theme={intuitionTheme}
              modalSize="compact"
            >
              <div className="relative flex h-screen w-full flex-col justify-between">
                <div className="flex-1">
                  <Outlet />
                </div>
              </div>
            </RainbowKitProvider>
          </WagmiConfig>
        </>
      ) : null}
    </Document>
  )
}
