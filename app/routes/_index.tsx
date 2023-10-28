import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export async function loader({}: LoaderFunctionArgs) {
  return redirect('/app')
}

export default function Index() {
  return (
    <div className="relative h-full w-full">
      <Outlet />
    </div>
  )
}
