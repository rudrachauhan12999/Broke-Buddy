import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Welcome back! 🐱' });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({ title: 'Account created! 🎉', description: 'Check your email to confirm.' });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-20 left-8 text-2xl animate-float opacity-30">✨</div>
      <div className="absolute top-32 right-12 text-xl animate-float opacity-20" style={{ animationDelay: '1s' }}>💰</div>

      <div className="pixel-card max-w-sm w-full" style={{ animation: 'slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <div className="text-center mb-6">
          <h1 className="font-pixel text-sm text-foreground uppercase tracking-widest">BrokeBuddy</h1>
          <p className="font-retro text-xl text-muted-foreground mt-1">
            {isLogin ? 'Welcome back! 🐱' : 'Join the adventure! 🚀'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider block mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Your name..."
                className="pixel-border-sm bg-card px-3 py-2.5 font-retro text-lg text-foreground placeholder:text-muted-foreground outline-none w-full focus:ring-2 focus:ring-primary transition-shadow"
                required
              />
            </div>
          )}
          <div>
            <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pixel-border-sm bg-card px-3 py-2.5 font-retro text-lg text-foreground placeholder:text-muted-foreground outline-none w-full focus:ring-2 focus:ring-primary transition-shadow"
              required
            />
          </div>
          <div>
            <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pixel-border-sm bg-card px-3 py-2.5 font-retro text-lg text-foreground placeholder:text-muted-foreground outline-none w-full focus:ring-2 focus:ring-primary transition-shadow"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="pixel-btn bg-primary text-primary-foreground w-full active:scale-95 transition-transform disabled:opacity-50"
          >
            {loading ? '...' : isLogin ? 'Login 🔑' : 'Sign Up 🎮'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-retro text-base text-primary hover:underline transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up!" : 'Already have an account? Login!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
