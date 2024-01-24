import { authenticator } from '@/lib/services/auth.server'

import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' })
}
