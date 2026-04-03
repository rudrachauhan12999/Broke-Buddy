import React, { useState, useEffect, useCallback } from 'react';
import BottomNav from '@/components/BottomNav';
import Dashboard from '@/components/Dashboard';
import AddExpense from '@/components/AddExpense';
import InsightsPanel from '@/components/InsightsPanel';
import AIChatPanel from '@/components/AIChatPanel';
import MonthlyWrap from '@/components/MonthlyWrap';
import ProfileCard from '@/components/ProfileCard';
import BalanceOverAlert from '@/components/BalanceOverAlert';
import Onboarding from '@/components/Onboarding';
import { useAuth } from '@/hooks/useAuth';
import {
  useProfile, useUpsertProfile,
  useCatPreferences, useUpdateCatSkin,
  useBalance, useUpdateBalance,
  useAddExpense,
} from '@/hooks/useBrokeBuddyData';

type CatSkin = 'white' | 'calico' | 'orange' | 'gray' | 'brown' | 'black';

const Index = () => {
  const { user } = useAuth();

  // DB hooks
  const { data: dbProfile } = useProfile();
  const { data: dbCatPrefs } = useCatPreferences();
  const { data: dbBalance } = useBalance();
  const upsertProfile = useUpsertProfile();
  const updateCatSkinMut = useUpdateCatSkin();
  const updateBalanceMut = useUpdateBalance();
  const addExpenseMut = useAddExpense();

  // Local state (used as fallback when not authenticated, or as initial values)
  const [screen, setScreen] = useState('dashboard');
  const [localBalance, setLocalBalance] = useState(7500);
  const [localCatSkin, setLocalCatSkin] = useState<CatSkin>('orange');
  const [showBalanceOver, setShowBalanceOver] = useState(false);
  const [username, setUsername] = useState('');
  const [onboarded, setOnboarded] = useState(false);

  // Sync from DB when data arrives
  useEffect(() => {
    if (dbProfile) {
      setUsername(dbProfile.username);
      setOnboarded(true);
    }
  }, [dbProfile]);

  useEffect(() => {
    if (dbCatPrefs) setLocalCatSkin(dbCatPrefs.skin as CatSkin);
  }, [dbCatPrefs]);

  useEffect(() => {
    if (dbBalance) setLocalBalance(dbBalance.current_balance);
  }, [dbBalance]);

  // Derived balance
  const balance = dbBalance?.current_balance ?? localBalance;
  const catSkin = (dbCatPrefs?.skin as CatSkin) ?? localCatSkin;

  const handleCatSkinChange = useCallback((skin: CatSkin) => {
    setLocalCatSkin(skin);
    if (user) updateCatSkinMut.mutate(skin);
  }, [user, updateCatSkinMut]);

  const handleAddExpense = useCallback((expense: { amount: number; category?: string; icon?: string }) => {
    const newBalance = Math.max(0, balance - expense.amount);
    setLocalBalance(newBalance);
    if (newBalance === 0) setShowBalanceOver(true);

    if (user) {
      addExpenseMut.mutate({
        category: expense.category ?? 'Other',
        icon: expense.icon ?? '📦',
        amount: expense.amount,
      });
      updateBalanceMut.mutate(newBalance);
    }
  }, [user, balance, addExpenseMut, updateBalanceMut]);

  const handleOnboardingComplete = useCallback((name: string) => {
    setUsername(name);
    setOnboarded(true);
    if (user) {
      upsertProfile.mutate({ username: name });
      // Initialize balance for the month
      updateBalanceMut.mutate(7500);
      updateCatSkinMut.mutate('orange');
    }
  }, [user, upsertProfile, updateBalanceMut, updateCatSkinMut]);

  if (!onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard balance={balance} catSkin={catSkin} onCatSkinChange={handleCatSkinChange} onTriggerBalanceOver={() => setShowBalanceOver(true)} />;
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
