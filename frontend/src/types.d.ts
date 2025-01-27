import { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
    suiWallet?: {
      getAccounts: () => Promise<string[]>;
      requestPermissions: () => Promise<string[]>;
      signAndExecuteTransaction: (transaction: any) => Promise<any>;
    };
  }
} 