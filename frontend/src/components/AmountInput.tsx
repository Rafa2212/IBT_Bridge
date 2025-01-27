import '../styles/theme.css';

interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

export function AmountInput({ amount, onAmountChange }: AmountInputProps) {
  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 className="heading">Bridge Amount</h3>
      <input
        className="input"
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        placeholder="Enter amount to bridge"
        min="0"
        step="0.000001"
      />
    </div>
  );
} 