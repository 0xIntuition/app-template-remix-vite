/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  devServerPort: 8002,
  tailwind: true,
  postcss: true,
  watchPaths: ['./tailwind.config.ts'],
  serverDependenciesToBundle: [
    'remix-utils',
    '@rainbow-me/rainbowkit',
    '@rainbow-me/rainbowkit/wallets',
    /^@?wagmi.*/,
    /^@?viem.*/,
  ],
  browserNodeBuiltinsPolyfill: {
    modules: { events: true, buffer: true, crypto: true },
  },
}
