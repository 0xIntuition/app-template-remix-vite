import { type GetContractReturnType } from 'viem'
import { optimismSepolia } from 'viem/chains'
import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useCreateTriple = () => {
  const multivault = useMultivaultContract(
    optimismSepolia.id,
  ) as GetContractReturnType

  return useContractWriteAndWait({
    ...multivault,
    functionName: 'createTriple',
  })
}
