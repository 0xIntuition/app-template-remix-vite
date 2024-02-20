import { Cacao, SiweMessage } from '@didtools/cacao'
import { randomBytes } from 'crypto'
import { DIDSession, createDIDKey } from 'did-session'
import { generateNonce } from 'siwe'
import { DEFAULT_CHAIN_ID } from './constants'

/**
 * Uses window.location.host and window.location.origin for the
 * defaults on this. This is used in the SIWE docs and is considered safe and a recommended practice.
 * As of now, this code only runs on the client. If we ever want to run SIWE in a server context we'd need
 * to dynamically set this based on environment and not rely on window.
 */

export function createSignInMessage(
  message: Partial<SiweMessage> = {},
): SiweMessage {
  message.domain ??= window.location.host // update the fallback for the domain
  message.statement ??= 'Sign in to Intuition'
  message.address ??= '0x0'
  message.uri ??= window.location.origin // update the fallback for the origin (we want to use the didKey.id, as shown below)
  message.version ??= '1'
  message.chainId ??= DEFAULT_CHAIN_ID
  message.nonce ??= generateNonce()

  return new SiweMessage(message)
}

export async function newDIDSessionFromWalletClient(walletClient: {
  account: { address: string }
  signMessage: (message: { message: string }) => Promise<string>
}) {
  if (!walletClient.account.address) throw new Error('No wallet client')

  // keys
  const keySeed = randomBytes(32)
  const didKey = await createDIDKey(keySeed)

  const base = createSignInMessage()
  const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // expire in 1 week

  // sign message
  const message = new SiweMessage({
    ...base,
    issuedAt: new Date().toISOString(),
    address: walletClient.account.address as string,
    expirationTime: expiration.toISOString(),
    uri: didKey.id, // overrides the default uri of window.location.origin
  })
  const signature = await walletClient?.signMessage({
    message: message.signMessage(),
  })
  message.signature = signature
  const cacao = Cacao.fromSiweMessage(message)
  const did = await DIDSession.initDID(didKey, cacao)
  return new DIDSession({ did, cacao, keySeed })
}
