import type { RuntimeCompositeDefinition } from '@composedb/types'
import { Cacao, SiweMessage } from '@didtools/cacao'
import { randomBytes } from 'crypto'
import { DIDSession, createDIDKey } from 'did-session'
import { arbitrumGoerli } from 'wagmi/chains'

// TODO: Export this from the client package
export const definition: RuntimeCompositeDefinition = {
  models: {
    AtomMetadata: {
      id: 'kjzl6hvfrbw6c5be464ta8ne35crfj4dbmxirtjrrdbhzmjvf9hlqtulfc2z7de',
      accountRelation: { type: 'list' },
    },
    EasMetadata: {
      id: 'kjzl6hvfrbw6c6bbvtt3odhuczkfzyfqpm6owxyn9og2s4dn419biarj4zl0cq0',
      accountRelation: { type: 'list' },
    },
  },
  objects: {
    AtomMetadataImageMetadata: {
      src: { type: 'string', required: true },
      size: { type: 'integer', required: false },
      width: { type: 'integer', required: true },
      height: { type: 'integer', required: true },
      mimeType: { type: 'string', required: true },
    },
    AtomMetadataImageSources: {
      original: {
        type: 'reference',
        refType: 'object',
        refName: 'AtomMetadataImageMetadata',
        required: true,
      },
      alternatives: {
        type: 'list',
        required: false,
        item: {
          type: 'reference',
          refType: 'object',
          refName: 'AtomMetadataImageMetadata',
          required: false,
        },
      },
    },
    AtomMetadata: {
      image: {
        type: 'reference',
        refType: 'object',
        refName: 'AtomMetadataImageSources',
        required: false,
      },
      atomID: { type: 'string', required: true, indexed: true },
      semantic: { type: 'string', required: false },
      corporaID: { type: 'string', required: false },
      description: { type: 'string', required: true, indexed: true },
      displayName: { type: 'string', required: true, indexed: true },
      thumbnailImage: { type: 'string', required: false },
      tripleCreation: { type: 'string', required: false },
      externalReference: { type: 'string', required: false },
    },
    EasMetadata: {
      data: { type: 'string', required: false },
      easId: { type: 'string', required: true, indexed: true },
      refUID: { type: 'string', required: true },
      attester: { type: 'string', required: true, indexed: true },
      recipient: { type: 'string', required: true },
      revocable: { type: 'boolean', required: true },
      expirationTime: { type: 'integer', required: true },
      revocationTime: { type: 'integer', required: true },
    },
  },
  enums: {},
  accountData: {
    atomMetadataList: { type: 'connection', name: 'AtomMetadata' },
    easMetadataList: { type: 'connection', name: 'EasMetadata' },
  },
}

//TODO: Export this to client package
export async function newDIDSessionFromWalletClient(walletClient: {
  account: { address: string }
  signMessage: (message: { message: string }) => Promise<string>
}) {
  if (!walletClient.account.address) throw new Error('No wallet client')
  // keys
  const keySeed = randomBytes(32)
  const didKey = await createDIDKey(keySeed)

  const base = new SiweMessage({
    version: '1',
    domain: 'intuition.systems',
    statement: 'I authorize my DID to be used by intuition.systems',
    issuedAt: /* @__PURE__ */ new Date().toISOString(),
    resources: [
      'ceramic://*?model=kjzl6hvfrbw6c5be464ta8ne35crfj4dbmxirtjrrdbhzmjvf9hlqtulfc2z7de',
      'ceramic://*?model=kjzl6hvfrbw6c6bbvtt3odhuczkfzyfqpm6owxyn9og2s4dn419biarj4zl0cq0',
    ],
  })
  const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // expire in 1 week

  // sign message
  const message = new SiweMessage({
    ...base,
    address: walletClient.account.address as string,
    chainId: arbitrumGoerli.id.toString(),
    expirationTime: expiration.toISOString(),
    uri: didKey.id,
  })
  const signature = await walletClient?.signMessage({
    message: message.signMessage(),
  })
  message.signature = signature
  const cacao = Cacao.fromSiweMessage(message)
  const did = await DIDSession.initDID(didKey, cacao)
  return new DIDSession({ did, cacao, keySeed })
}
