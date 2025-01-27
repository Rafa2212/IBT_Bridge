import '../styles/theme.css';

interface BridgeControlsProps {
  loading: boolean;
  disabled: boolean;
  onBridgeEthToSui: () => Promise<void>;
  onBridgeSuiToEth: () => Promise<void>;
  status?: {
    type: 'success' | 'error';
    message: string;
  };
}

export function BridgeControls({ 
  loading, 
  disabled, 
  onBridgeEthToSui, 
  onBridgeSuiToEth,
  status 
}: BridgeControlsProps) {
  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 className="heading">Bridge Direction</h3>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          className="button"
          onClick={onBridgeEthToSui}
          disabled={disabled || loading}
        >
          Bridge ETH → SUI
        </button>
        
        <button
          className="button"
          onClick={onBridgeSuiToEth}
          disabled={disabled || loading}
        >
          Bridge SUI → ETH
        </button>
      </div>

      {loading && (
        <div className="loading-text">
          <span>Transaction in progress</span>
          <div className="loading-dots">...</div>
        </div>
      )}

      {status && (
        <div 
          style={{ 
            marginTop: '16px',
            padding: '12px',
            borderRadius: 'var(--border-radius)',
            backgroundColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: status.type === 'success' ? 'var(--success-color)' : 'var(--error-color)',
            fontSize: '0.95rem'
          }}
        >
          {status.message}
        </div>
      )}
    </div>
  );
} 