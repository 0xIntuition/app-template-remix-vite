import { multivaultAbi } from '@/lib/abis/ethMultiVault'
import { getContract } from 'viem'
import { optimismSepolia } from 'viem/chains'
import { usePublicClient, type Address } from 'wagmi'
import { MULTIVAULT_CONTRACT_ADDRESS } from '../utils/constants'

export const MULTIVAULT_ADDRESS: Record<number, string> = {
  [optimismSepolia.id]: MULTIVAULT_CONTRACT_ADDRESS,
}

export const getMultivaultContractConfig = (chainId?: number) => ({
  address: (chainId && chainId in MULTIVAULT_ADDRESS
    ? MULTIVAULT_ADDRESS[chainId]
    : '') as Address,
  abi: multivaultAbi,
})

export function useMultivaultContract(chainId?: number) {
  const publicClient = usePublicClient({ chainId })

  return getContract({
    ...getMultivaultContractConfig(chainId || publicClient.chain.id),
    publicClient,
  })
}
