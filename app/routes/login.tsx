import IntuitionLogotype from '@/assets/intuition-logotype'
import { AccountButton } from '@/components/account-button'
import { Button as BaseButton } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy } from '@/components/ui/copy'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/remix-form'

import { login } from '@/lib/services/auth.server'
import { formAction } from '@/lib/services/form.server'
import { cn } from '@/lib/utils/misc'
import { newDIDSessionFromWalletClient } from '@/lib/utils/siwe'

import { ActionFunctionArgs, LoaderFunction, json } from '@remix-run/node'
import {
  FetcherWithComponents,
  Link,
  useFetcher,
  useNavigation,
} from '@remix-run/react'
import { DIDSession } from 'did-session'
import { makeDomainFunction } from 'domain-functions'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { z } from 'zod'

const schema = z.object({
  didSession: z.string(),
  apikey: z.string(),
  wallet: z.string(),
})
const mutation = makeDomainFunction(schema)(async (values) => {
  return values
})

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
  const url = new URL(request.url)
  const didSession = url.searchParams.get('didSession')
  const apikey = url.searchParams.get('apikey')

  if (didSession) {
    const isValid = await DIDSession.fromSession(didSession)
    if (!isValid) {
      return json({ didSessionError: 'Invalid DID Session' })
    }

    const resp = await fetch(`${process.env.API_URL}/apikey`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${didSession}`,
      },
    })
    if (resp.ok) {
      const { key } = await resp.json()
      return json({ apikey: key })
    }

    if (apikey) {
      const resp = await fetch(`${process.env.API_URL}/apikey/${apikey}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${didSession}`,
        },
      })
      const { ok } = await resp.json()
      if (!ok) {
        return json({ apikeyError: 'Invalid API Key' })
      }
    }
  }

  return null
}

export default function LoginIndexRoute() {
  const { isConnected } = useAccount()
  const fetcher = useFetcher<{
    didSessionError?: string
    apikeyError?: string
    apikey?: string
  } | null>()

  async function handleSignout() {
    fetcher.submit({}, { method: 'post', action: '/action/auth/logout' })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-y-12 p-24">
      <div className="w-full max-w-7xl items-start justify-between lg:flex">
        <div className="space-y-6 max-lg:flex max-lg:flex-col max-lg:items-center">
          <Link to="/">
            <IntuitionLogotype />
          </Link>
          <p className="bg-gray-50/5 cursor-default rounded-md border border-stone-800/50 px-3 py-2 font-mono text-sm backdrop-blur-sm">
            Get started by authenticating your{' '}
            <span className="font-bold text-success-500">DID Session</span> and{' '}
            <span className="font-bold text-success-500">API Key</span>
          </p>
        </div>
        <div className="mt-4 flex flex-col items-end gap-4 max-lg:items-center max-lg:justify-center">
          {!isConnected ? (
            <div className="m-auto">
              <AccountButton handleSignout={handleSignout} />
            </div>
          ) : (
            <div className="m-auto">
              <LoginForm fetcher={fetcher} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

interface LoginFormProps {
  fetcher: FetcherWithComponents<any>
}

export function LoginForm({ fetcher }: LoginFormProps) {
  const navigation = useNavigation()
  const { isConnected, address } = useAccount()
  const { data: walletClient } = useWalletClient()

  const [didSession, setDidSession] = useState<string>('')
  const [apikey, setApikey] = useState<string>('')
  const [wallet, setWallet] = useState<string>('')

  const asyncValidationErrors = fetcher.data
  console.log('didSession', didSession)

  async function signMessage() {
    try {
      const didSesh = await newDIDSessionFromWalletClient({
        account: walletClient?.account!,
        signMessage: walletClient?.signMessage!,
      })
      setDidSession(didSesh.serialize())
      fetcher.load(`/login?index&didSession=${didSesh.serialize()}`)
    } catch (e) {
      window.alert(e)

      if (e instanceof Error) {
        return json({ status: 'error' } as const, {})
      }
    }
  }

  useEffect(() => {
    setWallet(address as string)
  }, [address])

  useEffect(() => {
    if (fetcher.state === 'idle') {
      if (fetcher.data && fetcher.data.apikey) {
        setApikey(fetcher.data.apikey)
      }
    }
  }, [fetcher.state])

  useEffect(() => {
    if (!isConnected) {
      setDidSession('')
      setApikey('')
      setWallet('')
    }
  }, [isConnected])

  return (
    <Card className="max-w-xs pb-8 pt-4">
      <div className="space-y-4">
        <div
          className={cn(
            'container space-y-2',
            !isConnected ? 'pointer-events-none opacity-20' : '',
          )}
        >
          <Label className="m-x-auto text-sm text-foreground">
            Authentication
          </Label>
          <Form schema={schema}>
            {({ Field, Errors, Error, Button, register, clearErrors }) => (
              <>
                <Field name="didSession" label="DID Session">
                  {({ Label, Errors, errors }) => (
                    <>
                      <Label />
                      <BaseButton
                        data-hidden={!!didSession}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={signMessage}
                        className="block w-full data-[hidden=true]:hidden"
                      >
                        Sign Message
                      </BaseButton>
                      <Input
                        data-hidden={!didSession}
                        readOnly={!!didSession}
                        placeholder="Your Serialized DID Session String"
                        {...register('didSession')}
                        value={didSession}
                        onChange={(event) => {
                          clearErrors('didSession')

                          fetcher.load(
                            `/login?index&didSession=${event.target.value}`,
                          )
                        }}
                        className={`${!didSession && 'hidden'} font-mono`}
                        startAdornment={
                          didSession && (
                            <>
                              <Copy text={didSession} />
                            </>
                          )
                        }
                        endAdornment={
                          didSession && (
                            <>
                              <CheckCircle2
                                className="h-4 w-4 fill-success-500"
                                color="black"
                              />
                            </>
                          )
                        }
                      />
                      {!errors && !asyncValidationErrors?.didSessionError && (
                        <div className="text-primary-400 text-xs">
                          Use your serialized did session string in the
                          'authorization' header when making API calls.
                        </div>
                      )}

                      <Errors />
                      {asyncValidationErrors &&
                        asyncValidationErrors.didSessionError && (
                          <Error>{asyncValidationErrors.didSessionError}</Error>
                        )}
                    </>
                  )}
                </Field>
                <Field name="apikey" label="API Key">
                  {({ Label, Errors, errors }) => (
                    <>
                      <Label />
                      <Input
                        {...register('apikey')}
                        disabled={
                          !didSession ||
                          (!!asyncValidationErrors &&
                            !!asyncValidationErrors?.didSessionError)
                        }
                        value={apikey}
                        onChange={(event) => {
                          clearErrors('apikey')
                          setApikey(event.target.value)
                          fetcher.load(
                            `/login?index&didSession=${didSession}&apikey=${event.target.value}`,
                          )
                        }}
                        className="font-mono"
                        startAdornment={
                          apikey && (
                            <>
                              <Copy text={apikey} />
                            </>
                          )
                        }
                        endAdornment={
                          apikey && (
                            <>
                              <CheckCircle2
                                className="h-4 w-4 fill-success-500"
                                color="black"
                              />
                            </>
                          )
                        }
                        placeholder="00000000-0000-0000-0000-000000000000"
                      />
                      {!errors && !asyncValidationErrors?.apikeyError && (
                        <div className="text-primary-400 text-xs">
                          Use your api key in the 'x-api-key' header when making
                          API calls.
                        </div>
                      )}
                      <Errors />
                      {asyncValidationErrors &&
                        asyncValidationErrors.apikeyError && (
                          <Error>{asyncValidationErrors.apikeyError}</Error>
                        )}
                    </>
                  )}
                </Field>
                <Field
                  name="wallet"
                  label="Wallet"
                  value={wallet}
                  className="hidden"
                >
                  {({ Label }) => (
                    <>
                      <Label />
                      <Input
                        {...register('wallet')}
                        disabled={!wallet}
                        value={wallet}
                        onChange={(event) => {
                          clearErrors('wallet')
                          setWallet(event.target.value)
                        }}
                        className="font-mono"
                      />
                    </>
                  )}
                </Field>
                <Errors />
                <Button>
                  {navigation.state === 'idle'
                    ? 'Authenticate'
                    : ' Authenticating'}
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </Card>
  )
}
