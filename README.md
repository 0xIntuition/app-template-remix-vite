# Intuition App Template - Remix

Welcome Fren!

So, you're part of the exclusive Intuition Alpha Cohort? That's awesome! This Remix.run App Template is specially crafted just for you. We know how tedious and time-consuming it can be to set up authentication from scratch. That's why we've got you covered. With this template, you can skip the boring part and dive straight into building the core functionality of your app. After all, isn't that why we all got into coding? To create cool sh\*t!

## Summary

This Intuition Remix.run App Template is your golden ticket to a smooth start with your Intuition project. Here's why:

- **Alpha Access**: First things first, this isn't for everyone. You've got to be part of the Intuition Alpha Cohort to use this application. Your API Key is like a VIP pass to a hackathon party where everyone is awkwardly standing in the corner with their laptop.

- **Authentication Ready**: We've integrated remix-auth and set it up for Intuition's closed alpha. This means your app will have authentication using DID Session authorization and an API key. And guess what? If your wallet connects and is part of our elite cohort, the API key fetches itself. **magic ✨**

- **Focus on What Matters**: With authentication out of the way, you can channel all your energy and creativity into building the unique features of your app. We handled the nitty-gritty, so you don't have to.

## Getting Started

1. Prerequisites:

Node.js: Before anything else, Remix.run requires that you have either a Active or Maintenance version of Node.js installed. [Remix Documentation](https://remix.run/docs/en/main/other-api/node)

ArbitrumGoerli: Intuition is currently deployed on Arbitrum Goerli. To interact with the Intuition API, you'll need to connect to the Arbitrum Goerli testnet. Unsure how to do that? Check out this [tutorial](https://developer.offchainlabs.com/docs/developer_quickstart).

Network Configuration:

| Parameter                     | Value                                   |
| ----------------------------- | --------------------------------------- |
| Network Name                  | `Arbitrum Goerli`                       |
| RPC URL                       | `https://goerli-rollup.arbitrum.io/rpc` |
| Chain ID                      | `421613`                                |
| Currency Symbol               | `AGOR`                                  |
| Block Explorer URL (Optional) | `https://goerli.arbiscan.io`            |

2. Fork the Repository:

Instead of just cloning, we'd love for you to fork the repository. This way, we can keep track of the amazing things you're building and be part of your journey. Head over to the repository and click on the "Fork" button. Once forked, you can clone your forked repo to your local machine:

```bash
git clone [YOUR-FORKED-REPO-URL]
```

3. Install Dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Environment Setup:
   Setting up your environment is like giving your app its own personal space. Copy the `.env.example` and rename it to `.env` Here's how you can do it:

- **WALLETCONNECT_PROJECT_ID**: This lets users connect their wallets with rainbowkit via WalletConnect. Unsure about it? No stress! Follow this [tutorial](https://docs.walletconnect.com/2.0/cloud/explorer#setting-up-a-new-project).

- **ALCHEMY_API_KEY**: To sync up with chains using wagmi's Alchemy provider, you'll need this. Specifically, an Arbitrum Goerli Alchemy API key. Unsure where to start? Check out this [tutorial](https://docs.alchemy.com/docs/alchemy-quickstart-guide).

- **SESSION_SECRET**: Required for [remix-auth](https://github.com/sergiodxa/remix-auth). Think of it as your app's secret handshake. Whip one up with `openssl rand -base64 32`.

- **API_URL**: Intuition alpha API url. This is already defaulted to the proper value.

At this point, your `.env` file should look something like this:

```bash
ALCHEMY_API_KEY=REPLACE_ME
WALLETCONNECT_PROJECT_ID=REPLACE_ME

# openssl rand -base64 32
SESSION_SECRET=WwrFzRazSs4LjV9XEXymW/XsukYTSWpSCKdiB7MNWr0=
API_URL=https://api.intuition.cafe
```

**Note**: Running this locally will result in a mismatch between the url the SIWE is expecting and the url that is being served. This is ok. The SIWE will still work as expected.

Now you are fully moisturized, in your lane, and ready to dev on Intuition! LFG.

5. Run the Development Server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Shadcn

Shadcn provides beautifully designed components that you can copy and paste into your apps and enables you to bootstrap them via cli ([shadcn documentation](https://ui.shadcn.com/)). It 5x's your productivity and allows you to focus on what matters most, your business logic + features. Even better, we have set up the config for you so you can use it out of the box 🤝. Get after it, stay hard you 10x engineer, you.

Example Usage:

```bash
npx shadcn-ui@latest add form
```

## Learn More

To learn more about Intuition, take a look at the following resources:

- [Intuition Documentation](https://app.gitbook.com/o/xYyeoT5KBfRZxYH5NYQb/s/cVc9V0gt0E79kdhQIpdk/) - Discover the fundamental mechanics of Intuition through our documentation.
- [Getting Started](https://app.gitbook.com/o/xYyeoT5KBfRZxYH5NYQb/s/cVc9V0gt0E79kdhQIpdk/developer-docs/getting-started) - Reference this quick guide to use our API to create claims, make attestations, and query knowledge.
- [Contact Us](https://app.gitbook.com/o/xYyeoT5KBfRZxYH5NYQb/s/cVc9V0gt0E79kdhQIpdk/learn-more/contact-us) - Need help? Having trouble authenticating? Get support from the Intuition team.

## References

- [Remix.run Documentation](https://remix.run/) - learn about Remix.run features and API.
- [Remix-Auth Documentation](https://github.com/sergiodxa/remix-auth) - learn about Next-Auth features and API.
- [WalletConnect Documentation](https://docs.walletconnect.com/) - learn about WalletConnect features and API.
- [Alchemy Documentation](https://docs.alchemy.com/) - learn about Alchemy features and API.
