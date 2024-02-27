import { requireAuthedUser } from '@/lib/services/auth.server'
import { User } from 'types/user'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Header from '@/components/header'
import { getMultiVaultConfig } from '@/lib/services/multivault.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await requireAuthedUser(request)) as User
  const multivaultLoaderData = await getMultiVaultConfig()
  return json({
    user,
    multivaultLoaderData,
  })
}

export default function ContractDataPage() {
  const { user, multivaultLoaderData } = useLoaderData<typeof loader>()
  console.log('multivault data', multivaultLoaderData) // this logs on the server

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-12 p-8">
      <Header user={user} />
      <div className="flex h-full flex-col items-center pt-[32vh]">
        <span className="opacity-70">
          Atom Cost From the Server: {multivaultLoaderData.atom_cost}
        </span>
      </div>
    </main>
  )
}
