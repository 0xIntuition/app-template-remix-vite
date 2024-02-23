import { requireAuthedUser } from '@/lib/services/auth.server'

import { User } from 'types/user'

import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Header from '@/components/header'
import GetStarted from '@/components/get-started'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await requireAuthedUser(request)) as User
  return json({
    user,
  })
}

export default function AppIndex() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-12 p-8">
      <Header user={user} />
      <div className="flex h-full flex-col items-center pt-[32vh]">
        <GetStarted />
      </div>
    </main>
  )
}
