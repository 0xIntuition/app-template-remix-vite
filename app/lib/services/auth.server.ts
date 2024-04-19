import { sessionStorage } from '@/.server/session'
import { redirect } from '@remix-run/node'
import { DIDSession } from 'did-session'
import { Authenticator } from 'remix-auth'
import type { User } from 'types/user'
import { invariant } from '@/lib/utils/misc'
import { FormStrategy } from '@/lib/utils/auth-strategy'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: '_session',
  sessionErrorKey: '_session_error',
})

const apiUrl = process.env.API_URL

if (!apiUrl) {
  throw new Error('API_URL is not defined')
}

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
    console.log('authenticate user', user)
    return user
  }),
  'auth',
)

export async function authenticate(
  didSession: string,
  wallet: string,
): Promise<User> {
  const session = await DIDSession.fromSession(didSession)

  if (!session || !session.hasSession || session.isExpired) {
    throw new Error('Invalid DID Session')
  }
  // const ensName = await mainnetClient.getEnsName({ address: wallet as Address })

  const isAuthed = await fetch(`${apiUrl}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY!,
    },
    body: JSON.stringify({
      didSession,
    }),
  })

  if (!isAuthed.ok) {
    throw new Error('Not authorized')
  }

  const { token, refreshToken, newUser, userId } = await isAuthed.json()

  return {
    didSession,
    wallet,
    id: userId,
    token,
    refreshToken,
    newUser,
  }
}

export async function login(request: Request) {
  await authenticator.authenticate('auth', request, {
    successRedirect: '/',
  })
}

export async function logout(request: Request) {
  await authenticator.logout(request, { redirectTo: '/' })
}

// export async function requireAuthedUser(request: Request) {
//   const user = await authenticator.isAuthenticated(request)
//   if (user) return await Promise.resolve(user)
//   return redirect('/')
// }

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
