import '../styles/theme.css';

interface WalletConnectorProps {
  ethAddress: string;
  suiAddress: string;
  onConnectMetaMask: () => Promise<void>;
  onConnectSuiWallet: () => Promise<void>;
}

export function WalletConnector({ 
  ethAddress, 
  suiAddress, 
  onConnectMetaMask, 
  onConnectSuiWallet 
}: WalletConnectorProps) {
  return (
    <div className="card">
      <h3 className="heading">Connect Wallets</h3>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          className="button"
          onClick={onConnectMetaMask}
          disabled={!!ethAddress}
        >
          {ethAddress ? `Connected: ${ethAddress.slice(0,6)}...${ethAddress.slice(-4)}` : 'Connect MetaMask'}
        </button>
        
        <button 
          className="button"
          onClick={onConnectSuiWallet}
          disabled={!!suiAddress}
        >
          {suiAddress ? `Connected: ${suiAddress.slice(0,6)}...${suiAddress.slice(-4)}` : 'Connect Sui Wallet'}
        </button>
      </div>
    </div>
  );
} 