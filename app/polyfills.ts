import { Buffer } from 'buffer'

// bare minimum polyfills to get vite working with web3 tooling

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer ?? Buffer
}

export {}
