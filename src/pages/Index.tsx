import React, { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import Dashboard from '@/components/Dashboard';
import AddExpense from '@/components/AddExpense';
import InsightsPanel from '@/components/InsightsPanel';
import AIChatPanel from '@/components/AIChatPanel';
import MonthlyWrap from '@/components/MonthlyWrap';
import ProfileCard from '@/components/ProfileCard';
import BalanceOverAlert from '@/components/BalanceOverAlert';
import Onboarding from '@/components/Onboarding';

type CatSkin = 'white' | 'calico' | 'orange' | 'gray' | 'brown' | 'black';

const Index = () => {
  const [screen, setScreen] = useState('dashboard');
  const [balance, setBalance] = useState(7500);
  const [catSkin, setCatSkin] = useState<CatSkin>('orange');
  const [showBalanceOver, setShowBalanceOver] = useState(false);
  const [username, setUsername] = useState('');
  const [onboarded, setOnboarded] = useState(false);

  const handleAddExpense = (expense: { amount: number }) => {
    const newBalance = Math.max(0, balance - expense.amount);
    setBalance(newBalance);
    if (newBalance === 0) setShowBalanceOver(true);
  };

  if (!onboarded) {
    return <Onboarding onComplete={(name) => { setUsername(name); setOnboarded(true); }} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard balance={balance} catSkin={catSkin} onCatSkinChange={setCatSkin} onTriggerBalanceOver={() => setShowBalanceOver(true)} />;
      case 'expense':
        return <AddExpense onAdd={handleAddExpense} />;
      case 'insights':
        return <InsightsPanel />;
      case 'chat':
        return <AIChatPanel />;
      case 'wrap':
        return <MonthlyWrap />;
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="font-pixel text-xs text-foreground uppercase tracking-widest text-center">Profile 🪪</h2>
            <ProfileCard
              username={username}
              healthScore={72}
              spendingTag="Chai Enthusiast ☕"
              monthlyBalance={balance}
              level={5}
              xp={3054200}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-4" style={{ minHeight: screen === 'chat' ? 'calc(100vh - 80px)' : 'auto' }}>
        <div className={screen === 'chat' ? 'h-[calc(100vh-100px)] flex flex-col' : ''}>
          {renderScreen()}
        </div>
      </div>

      <BottomNav active={screen} onNavigate={setScreen} />
      <BalanceOverAlert show={showBalanceOver} onDismiss={() => setShowBalanceOver(false)} />
    </div>
  );
};

export default Index;
