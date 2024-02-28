# Intuition App Template - Remix-Vite

Welcome to the Intuition App Template for Remix with a Vite development environment, designed to streamline your development process for building innovative, decentralized applications. This template provides out-of-the-box authentication, on-chain interactions, and efficient styling.

The integration of Vite with Remix in the Intuition App Template enhances the development experience by offering rapid hot module replacement (HMR), a streamlined plugin system for easy extensibility, and improved support for modern web technologies. This combination significantly accelerates development cycles, simplifies the integration of tools like Tailwind CSS, and optimizes the overall developer experience with faster feedback loops and build processes. Remix currently supports Vite as an alternative compiler. In the future, Vite will become the default compiler for Remix.

Learn more about our starter templates in the [Intuition Documentation](https://docs.intuition.systems/guides/starter-templates).
Learn more about Remix-Vite in the [Remix Documentation](https://remix.run/docs/en/main/future/vite).

## Getting Started

### Prerequisites

Node.js: Before anything else, Remix.run requires that you have either a Active or Maintenance version of Node.js installed. [Remix Documentation](https://remix.run/docs/en/main/other-api/node)

Optimism Sepolia: Intuition is currently deployed on Optimism Sepolia Testnet. To interact with the Intuition API, you'll need to connect to the [Optimism Sepolia Testnet](https://docs.optimism.io/chain/networks).

### Network Configuration

| Parameter                     | Value                                     |
| ----------------------------- | ----------------------------------------- |
| Network Name                  | `OP Sepolia`                              |
| RPC URL                       | `https://sepolia.optimism.io`             |
| Chain ID                      | `11155420`                                |
| Currency Symbol               | `ETH`                                     |
| Block Explorer URL (Optional) | `https://sepolia-optimistic.etherscan.io` |

## Setup Steps

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:0xIntuition/app-template-remix.git
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**:

   Copy `.env.example` to `.env` and configure as follows:

   - `ALCHEMY_API_KEY`: Alchemy Optimism Sepolia Testnet API key. [Tutorial](https://docs.alchemy.com/docs/alchemy-quickstart-guide).
   - `ALCHEMY_RPC_URL`: Alchemy RPC URL for the Optimism Sepolia Testnet.
   - `WALLETCONNECT_PROJECT_ID`: For wallet connections via WalletConnect. [Tutorial](https://docs.walletconnect.com/2.0/cloud/explorer#setting-up-a-new-project).
   - `SESSION_SECRET`: Required for [remix-auth](https://github.com/sergiodxa/remix-auth). Generate with `openssl rand -base64 32`.
   - `API_URL`: Intuition alpha API url.
   - `API_KEY`: Intuition Beta API key. [Tutorial](https://docs.intuition.systems/getting-started/dev-quick-start).

4. **Run the Development Server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app+/_index.tsx`. The page auto-updates as you edit the file.

## Shadcn

Shadcn provides beautifully designed components that you can copy and paste into your apps and enables you to bootstrap them via cli ([Shadcn Documentation](https://ui.shadcn.com/)). It 5x's your productivity and allows you to focus on what matters most, your business logic + features. Even better, we have set up the config for you so you can use it out of the box 🤝.

Example Usage:

```bash
npx shadcn-ui@latest add form
```

## Learn More

- [Intuition Documentation](https://docs.intuition.systems/)
- [Getting Started Guide](https://docs.intuition.systems/getting-started/dev-quick-start)
- [Examples](https://docs.intuition.systems/guides/examples)
- [Contact Us](https://app.gitbook.com/o/xYyeoT5KBfRZxYH5NYQb/s/cVc9V0gt0E79kdhQIpdk/learn-more/contact-us)

## Helpful References

- [Remix.run Documentation](https://remix.run/)
- [Vite Documentation](https://vitejs.dev/)
- [Remix-Auth Documentation](https://github.com/sergiodxa/remix-auth)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [Alchemy Documentation](https://docs.alchemy.com/)
