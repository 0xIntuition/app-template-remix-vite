import { getMultivaultContract } from '@/lib/utils/viem'
import { type LoaderFunctionArgs, json } from '@remix-run/node'

export type CreateIdentityLoaderData = {
  atomCost: string
  atomCreationFee: string
}

export async function loader({ request }: LoaderFunctionArgs) {
  const [[atomCost, atomCreationFee]] = (await Promise.all([
    getMultivaultContract.read.atomConfig(),
  ])) as [[BigInt, BigInt]]

  return json({
    atomCost: atomCost.toString(),
    atomCreationFee: atomCreationFee.toString(),
  } as CreateIdentityLoaderData)
}
