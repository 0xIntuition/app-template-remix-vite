import { Authenticator } from 'remix-auth'
import { sessionStorage } from '@/lib/services/session.server'
import { FormStrategy } from '../utils/auth-strategy'
import { invariant } from '../utils/misc'
import { DIDSession } from 'did-session'
import { User } from 'types/user'
import { redirect } from '@remix-run/node'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: '_session',
  sessionErrorKey: '_session_error',
})

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let didSession = form.get('didSession')
    let apikey = form.get('apikey')
    let wallet = form.get('wallet')
    // Validate the inputs
    invariant(
      typeof didSession === 'string',
      'DID Session must be a serialized string',
    )
    invariant(didSession.length > 0, 'DID Session must not be empty')
    invariant(typeof apikey === 'string', 'API Key must be a string')
    invariant(apikey.length > 0, 'password must not be empty')
    invariant(typeof wallet === 'string', 'Wallet must be a string')
    invariant(wallet.length > 0, 'Wallet must not be empty')

    // login the user
    let user = await authenticate(didSession, apikey, wallet)
    return user
  }),
  'alpha-auth',
)

export async function authenticate(
  didSession: string,
  apikey: string,
  wallet: string,
): Promise<User> {
  const session = await DIDSession.fromSession(didSession)
  if (!session || !session.hasSession || session.isExpired) {
    throw new Error('Invalid DID Session')
  }

  const isValidApiKey = await fetch(`${process.env.API_URL}/apikey/${apikey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${didSession}`,
    },
  })
  if (!isValidApiKey.ok) {
    throw new Error('Invalid API Key')
  }

  return {
    didSession,
    apikey,
    wallet,
  }
}

export async function login(request: Request) {
  await authenticator.authenticate('alpha-auth', request, {
    successRedirect: '/app',
  })
}

export async function logout(request: Request) {
  await authenticator.logout(request, { redirectTo: '/login' })
}

export async function requireAuthedUser(request: Request) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    console.log("User isn't authenticated -- redirecting to login")
    throw redirect('/login')
  }

  return await Promise.resolve(user)
}
