import { optimismSepolia } from 'viem/chains'

import type { Address } from 'viem'
import { usePreparedContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useDeposit = ({
  vault,
  wallet,
  assets,
  isClaim,
}: {
  vault: string
  wallet: Address
  assets: bigint
  isClaim?: boolean
}) => {
  const multivault = useMultivaultContract(optimismSepolia.id)

  const functionName = isClaim ? 'depositTriple' : 'depositAtom'
  const args = [wallet, vault]
  const value = assets
  const chainId = optimismSepolia.id
  const enabled =
    vault !== undefined && assets !== undefined && wallet !== undefined

  return usePreparedContractWriteAndWait({
    ...multivault,
    functionName,
    args,
    value,
    chainId,
    enabled,
  })
}
