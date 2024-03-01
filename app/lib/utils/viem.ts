import { http, createPublicClient, getContract } from "viem";
import { mainnet, optimismSepolia } from "viem/chains";
import { multivaultAbi } from "../abis/ethMultiVault";
import { MULTIVAULT_CONTRACT_ADDRESS } from "./constants";

const alchemyRpcUrl = process.env.ALCHEMY_RPC_URL;
const alchemyMainnetRpcUrl = process.env.ALCHEMY_MAINNET_RPC_URL;

export const publicClient = createPublicClient({
	batch: {
		multicall: true,
	},
	chain: optimismSepolia,
	transport: http(alchemyRpcUrl),
});

export const mainnetClient = createPublicClient({
	chain: mainnet,
	transport: http(alchemyMainnetRpcUrl),
});

export const getMultivaultContract = getContract({
	address: MULTIVAULT_CONTRACT_ADDRESS,
	abi: multivaultAbi,
	publicClient,
});

export const multiVaultContract = {
	address: MULTIVAULT_CONTRACT_ADDRESS,
	abi: multivaultAbi,
} as const;
