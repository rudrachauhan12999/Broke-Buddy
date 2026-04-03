import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const currentMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

// ---- Profile ----
export const useProfile = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUpsertProfile = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: { username?: string; monthly_budget?: number }) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('profiles')
        .upsert({ user_id: user.id, ...values }, { onConflict: 'user_id' });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
};

// ---- Cat Preferences ----
export const useCatPreferences = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['cat_preferences', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('cat_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUpdateCatSkin = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skin: string) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('cat_preferences')
        .upsert({ user_id: user.id, skin }, { onConflict: 'user_id' });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cat_preferences'] }),
  });
};

// ---- Balance ----
export const useBalance = () => {
  const { user } = useAuth();
  const month = currentMonth();
  return useQuery({
    queryKey: ['balance', user?.id, month],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('balances')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', month)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUpdateBalance = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const month = currentMonth();
  return useMutation({
    mutationFn: async (newBalance: number) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('balances')
        .upsert(
          { user_id: user.id, month, current_balance: newBalance },
          { onConflict: 'user_id,month' }
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['balance'] }),
  });
};

// ---- Expenses ----
export const useExpenses = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['expenses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });
};

export const useAddExpense = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (expense: { category: string; icon: string; amount: number; note?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('expenses')
        .insert({ ...expense, user_id: user.id });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] }),
  });
};
