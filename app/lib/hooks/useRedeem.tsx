import { optimismSepolia } from 'viem/chains'
import type { Address } from 'wagmi'

import { usePreparedContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useRedeem = ({
  vault,
  wallet,
  conviction,
  isClaim,
}: {
  vault: string
  wallet: Address
  conviction: bigint
  isClaim?: boolean
}) => {
  const multivault = useMultivaultContract(optimismSepolia.id)

  const functionName = isClaim ? 'redeemTriple' : 'redeemAtom'
  const args = [conviction, wallet, vault]
  const chainId = optimismSepolia.id
  const enabled =
    vault !== undefined && conviction !== undefined && wallet !== undefined

  return usePreparedContractWriteAndWait({
    ...multivault,
    functionName,
    args,
    chainId,
    enabled,
  })
}
