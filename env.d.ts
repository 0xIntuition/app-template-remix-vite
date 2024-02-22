/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module '*.module.scss' {
  const content: Record<string, string>
  export default content
}
