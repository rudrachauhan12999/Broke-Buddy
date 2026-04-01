import React, { useState } from 'react';

interface Expense {
  category: string;
  icon: string;
  amount: number;
}

const categories = [
  { name: 'Food', icon: '🍔' },
  { name: 'Transport', icon: '🚌' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Entertainment', icon: '🎮' },
  { name: 'Bills', icon: '📱' },
  { name: 'Other', icon: '📦' },
];

interface AddExpenseProps {
  onAdd: (expense: Expense) => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState('');
  const [selectedCat, setSelectedCat] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!amount || isNaN(Number(amount))) return;
    onAdd({
      category: categories[selectedCat].name,
      icon: categories[selectedCat].icon,
      amount: Number(amount),
    });
    setAmount('');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-pixel text-xs text-foreground uppercase tracking-widest text-center">
        Add Expense 💸
      </h2>

      {/* Amount input */}
      <div className="pixel-card text-center" style={{ background: 'linear-gradient(180deg, hsl(var(--card)), hsl(var(--pixel-cream)))' }}>
        <span className="font-pixel text-[10px] text-muted-foreground block mb-2">AMOUNT (₹)</span>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0"
          className="bg-transparent font-retro text-5xl text-center text-foreground outline-none w-full focus:text-primary transition-colors"
        />
        {amount && Number(amount) > 0 && (
          <p className="font-retro text-base text-muted-foreground mt-2 animate-fade-in">
            That's {Math.floor(Number(amount) / 15)} chai ☕
          </p>
        )}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-3 gap-2.5">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCat(i)}
            className={`pixel-card flex flex-col items-center gap-1.5 transition-all active:scale-90 ${
              i === selectedCat ? 'ring-2 ring-primary scale-105' : 'hover:scale-102 opacity-70 hover:opacity-100'
            }`}
            style={{ transform: `rotate(${(i % 2 === 0 ? 0.8 : -0.8)}deg)` }}
          >
            <span className={`text-2xl transition-transform ${i === selectedCat ? 'scale-125' : ''}`}>{cat.icon}</span>
            <span className="font-pixel text-[7px] text-foreground uppercase">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className={`pixel-btn w-full text-sm active:scale-95 transition-all ${added ? 'bg-accent text-accent-foreground scale-105' : 'bg-primary text-primary-foreground'}`}
      >
        {added ? '✓ Added! 🎉' : '+ Add Expense'}
      </button>
    </div>
  );
};

export default AddExpense;
