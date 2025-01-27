/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUI_PACKAGE_ID: string
  readonly VITE_ETH_CONTRACT_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 