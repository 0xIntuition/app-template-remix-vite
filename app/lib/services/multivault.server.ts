import {
  ContractFunctionConfig,
  ContractFunctionResult,
  formatUnits,
} from 'viem'
import { multiVaultContract, publicClient } from '../utils/viem'

export type MultivaultConfig = {
  entry_fee: string
  formatted_entry_fee: string
  exit_fee: string
  formatted_exit_fee: string
  protocol_fee: string
  fee_denominator: string
  min_deposit: string
  min_share: string
  atom_cost: string
  formatted_atom_cost: string
  atom_creation_fee: string
  formatted_atom_creation_fee: string
  triple_creation_fee: string
  formatted_triple_creation_fee: string
  atom_equity_fee: string
  formatted_atom_equity_fee: string
  is_triple?: boolean
}

interface MulticallResponse {
  result?: any // TODO: Properly type the multicall result
  error?: Error
  status: 'failure' | 'success'
}

export async function getMultiVaultConfig() {
  let coreContractConfigs = [
    {
      ...multiVaultContract,
      functionName: 'generalConfig',
      args: [],
    },
    {
      ...multiVaultContract,
      functionName: 'vaultFees',
      args: [0],
    },
    {
      ...multiVaultContract,
      functionName: 'atomConfig',
      args: [],
    },
    {
      ...multiVaultContract,
      functionName: 'tripleConfig',
      args: [],
    },
  ] as ContractFunctionConfig[]

  const resp: MulticallResponse[] = (
    await publicClient.multicall({
      contracts: coreContractConfigs,
    })
  ).map((response) => ({
    ...response,
    result: response.result
      ? (response.result as ContractFunctionResult[])
      : undefined,
  }))

  const fee_denominator = resp[0].result[2] as bigint
  const formatted_fee_denominator = formatUnits(fee_denominator, 18)
  const min_deposit = resp[0].result[3] as bigint
  const formatted_min_deposit = formatUnits(min_deposit, 18)
  const min_share = resp[0].result[4] as bigint
  const formatted_min_share = formatUnits(min_share, 18)
  const entry_fee = resp[1].result[0] as bigint
  const formatted_entry_fee = formatUnits(entry_fee, 18)
  const exit_fee = resp[1].result[1] as bigint
  const formatted_exit_fee = formatUnits(exit_fee, 18)
  const protocol_fee = resp[1].result[2] as bigint
  const formatted_protocol_fee = formatUnits(protocol_fee, 18)
  const atom_cost = resp[2].result[0] as bigint
  const formatted_atom_cost = formatUnits(atom_cost, 18)
  const atom_creation_fee = resp[2].result[1] as bigint
  const formatted_atom_creation_fee = formatUnits(atom_creation_fee, 18)
  const triple_creation_fee = resp[3].result[0] as bigint
  const formatted_triple_creation_fee = formatUnits(triple_creation_fee, 18)
  const atom_equity_fee = resp[3].result[1] as bigint
  const formatted_atom_equity_fee = formatUnits(atom_equity_fee, 18)

  return {
    fee_denominator: fee_denominator.toString(),
    formatted_fee_denominator,
    min_deposit: min_deposit.toString(),
    formatted_min_deposit,
    min_share: min_share.toString(),
    formatted_min_share,
    entry_fee: entry_fee.toString(),
    formatted_entry_fee,
    exit_fee: exit_fee.toString(),
    formatted_exit_fee,
    protocol_fee: protocol_fee.toString(),
    formatted_protocol_fee,
    atom_cost: atom_cost.toString(),
    formatted_atom_cost,
    atom_creation_fee: atom_creation_fee.toString(),
    formatted_atom_creation_fee,
    triple_creation_fee: triple_creation_fee.toString(),
    formatted_triple_creation_fee,
    atom_equity_fee: atom_equity_fee.toString(),
    formatted_atom_equity_fee,
  } as MultivaultConfig
}
