import { sessionStorage } from '@/lib/services/session.server'
import { redirect } from '@remix-run/node'
import { DIDSession } from 'did-session'
import { Authenticator } from 'remix-auth'
import type { User } from 'types/user'
import { FormStrategy } from '../utils/auth-strategy'
import { invariant } from '../utils/misc'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: '_session',
  sessionErrorKey: '_session_error',
})

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let didSession = form.get('didSession')
    let wallet = form.get('wallet')
    // Validate the inputs
    invariant(
      typeof didSession === 'string',
      'DID Session must be a serialized string',
    )
    invariant(didSession.length > 0, 'DID Session must not be empty')
    invariant(typeof wallet === 'string', 'Wallet must be a string')
    invariant(wallet.length > 0, 'Wallet must not be empty')

    // login the user
    let user = await authenticate(didSession, wallet)
    return user
  }),
  'auth',
)

export async function authenticate(
  didSession: string,
  wallet: string,
): Promise<User> {
  const session = await DIDSession.fromSession(didSession)
  if (!session.hasSession || session.isExpired) {
    throw new Error('Invalid DID Session')
  }

  return {
    didSession,
    wallet,
  }
}

export async function login(request: Request) {
  await authenticator.authenticate('auth', request, {
    successRedirect: '/app',
  })
}

export async function logout(request: Request) {
  await authenticator.logout(request, { redirectTo: '/login' })
}

export const requireAuthedUser = async <TRequest extends Request>(
  request: TRequest,
) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    throw redirect('/login', 302)
  }
  return user
}

export async function isAuthedUser(request: Request) {
  const user = await authenticator.isAuthenticated(request)
  if (user) return await Promise.resolve(user)
  return null
}
