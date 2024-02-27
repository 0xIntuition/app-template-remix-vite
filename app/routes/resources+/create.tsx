import { getMultiVaultConfig } from '@/lib/services/multivault.server'
import { json, type LoaderFunctionArgs } from '@remix-run/node'

export type CreateLoaderData = {
  tripleCreationFee: string
  tripleCreationFeeRaw: string
  atomEquityFeeRaw: string
  atomCost: string
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const multiVaultConfig = await getMultiVaultConfig()

    const {
      triple_creation_fee,
      formatted_triple_creation_fee,
      atom_equity_fee,
      atom_cost,
      atom_creation_fee,
    } = multiVaultConfig

    return json({
      tripleCreationFee: formatted_triple_creation_fee,
      tripleCreationFeeRaw: triple_creation_fee,
      atomEquityFeeRaw: atom_equity_fee,
      atomCost: atom_cost,
      atomCreationFee: atom_creation_fee,
    })
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
      return null
    }
  }
}
