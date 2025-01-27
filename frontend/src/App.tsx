import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { WalletConnector } from './components/WalletConnector';
import { AmountInput } from './components/AmountInput';
import { BridgeControls } from './components/BridgeControls';
import './styles/theme.css';

const BACKEND_URL = 'http://localhost:3000';
const SUI_PACKAGE_ID = import.meta.env.VITE_SUI_PACKAGE_ID;
const ETH_CONTRACT_ADDRESS = import.meta.env.VITE_ETH_CONTRACT_ADDRESS;

// ABI for the token contract
const TOKEN_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
];

function App() {
  const [ethAddress, setEthAddress] = useState<string>('');
  const [suiAddress, setSuiAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | undefined>();

  useEffect(() => {
    checkWalletConnections();
  }, []);

  const checkWalletConnections = async () => {
    // Check MetaMask connection
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setEthAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    }

    // Check Sui Wallet connection
    if (window.suiWallet) {
      try {
        const accounts = await window.suiWallet.getAccounts();
        if (accounts.length > 0) {
          setSuiAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking Sui Wallet connection:', error);
      }
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setStatus({ type: 'error', message: 'Please install MetaMask!' });
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setEthAddress(accounts[0]);
      setStatus({ type: 'success', message: 'MetaMask connected successfully!' });
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setStatus({ type: 'error', message: 'Failed to connect MetaMask' });
    }
  };

  const connectSuiWallet = async () => {
    if (!window.suiWallet) {
      setStatus({ type: 'error', message: 'Please install Sui Wallet!' });
      return;
    }

    try {
      const accounts = await window.suiWallet.requestPermissions();
      setSuiAddress(accounts[0]);
      setStatus({ type: 'success', message: 'Sui Wallet connected successfully!' });
    } catch (error) {
      console.error('Error connecting to Sui Wallet:', error);
      setStatus({ type: 'error', message: 'Failed to connect Sui Wallet' });
    }
  };

  const bridgeEthToSui = async () => {
    if (!ethAddress || !suiAddress || !amount) {
      setStatus({ type: 'error', message: 'Please connect both wallets and enter an amount' });
      return;
    }

    setLoading(true);
    setStatus(undefined);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not connected');
      }
      // First approve the contract to spend tokens
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(ETH_CONTRACT_ADDRESS, TOKEN_ABI, signer);
      
      const amountWei = ethers.parseUnits(amount, 18);
      const approveTx = await tokenContract.approve(ETH_CONTRACT_ADDRESS, amountWei);
      await approveTx.wait();

      // Call backend to handle the bridge
      const response = await axios.post(`${BACKEND_URL}/bridge/eth-to-sui`, {
        ethAddress,
        suiAddress,
        amount: parseFloat(amount)
      });

      if (response.data.success) {
        setStatus({ 
          type: 'success', 
          message: `Bridge successful!\nETH Transaction: ${response.data.ethTxHash.slice(0,6)}...${response.data.ethTxHash.slice(-4)}\nSUI Transaction: ${response.data.suiTxHash.slice(0,6)}...${response.data.suiTxHash.slice(-4)}` 
        });
        setAmount('');
      }
    } catch (error: any) {
      console.error('Error bridging ETH to SUI:', error);
      setStatus({ 
        type: 'error', 
        message: `Error during bridge: ${error.response?.data?.error || error.message}` 
      });
    }
    setLoading(false);
  };

  const bridgeSuiToEth = async () => {
    if (!ethAddress || !suiAddress || !amount) {
      setStatus({ type: 'error', message: 'Please connect both wallets and enter an amount' });
      return;
    }

    setLoading(true);
    setStatus(undefined);

    try {
      // First, we need to get the transaction digest from the Sui wallet
      const transferTx = {
        kind: 'moveCall',
        data: {
          packageObjectId: SUI_PACKAGE_ID,
          module: 'IBT',
          function: 'burn_and_bridge',
          typeArguments: [],
          arguments: [
            ethAddress,
            (parseFloat(amount) * 1e6).toString()
          ],
          gasBudget: 10000,
        },
      };

      if (!window.suiWallet) {
        throw new Error('Sui wallet not connected');
      }

      const transferResult = await window.suiWallet.signAndExecuteTransaction(transferTx);
      
      // Call backend to handle the bridge
      const response = await axios.post(`${BACKEND_URL}/bridge/sui-to-eth`, {
        ethAddress,
        suiAddress,
        amount: parseFloat(amount),
        txDigest: transferResult.certificate.transactionDigest
      });

      if (response.data.success) {
        setStatus({ 
          type: 'success', 
          message: `Bridge successful!\nSUI Transaction: ${response.data.suiTxHash.slice(0,6)}...${response.data.suiTxHash.slice(-4)}\nETH Transaction: ${response.data.ethTxHash.slice(0,6)}...${response.data.ethTxHash.slice(-4)}` 
        });
        setAmount('');
      }
    } catch (error: any) {
      console.error('Error bridging SUI to ETH:', error);
      setStatus({ 
        type: 'error', 
        message: `Error during bridge: ${error.response?.data?.error || error.message}` 
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: 'var(--text-color)',
        fontSize: '2.5rem',
        marginBottom: '20px',
        fontWeight: '700'
      }}>
        IBT Token Bridge
      </h1>
      
      <WalletConnector
        ethAddress={ethAddress}
        suiAddress={suiAddress}
        onConnectMetaMask={connectMetaMask}
        onConnectSuiWallet={connectSuiWallet}
      />

      <AmountInput
        amount={amount}
        onAmountChange={setAmount}
      />

      <BridgeControls
        loading={loading}
        disabled={!ethAddress || !suiAddress || !amount}
        onBridgeEthToSui={bridgeEthToSui}
        onBridgeSuiToEth={bridgeSuiToEth}
        status={status}
      />
    </div>
  );
}

export default App; 