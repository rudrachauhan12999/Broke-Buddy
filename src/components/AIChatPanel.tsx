import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const initialMessages: Message[] = [
  { id: 1, text: "Hey! I noticed you spent ₹1,200 on food this week. That's 40% more than usual! 🍔", sender: 'ai', timestamp: new Date() },
  { id: 2, text: "Also, you have 2 subscriptions you haven't used in 30 days. Want me to flag them? 🎵", sender: 'ai', timestamp: new Date() },
];

const aiResponses: Record<string, string> = {
  'afford': "Hmm, let me check... Based on your spending rate, you have about ₹2,400 left for 12 days. That's ₹200/day. If this costs less, go for it! 💰",
  'save': "Great question! Try the 50-30-20 rule: 50% needs, 30% wants, 20% savings. You could save ₹3,000 more this month! 🐱",
  'food': "Your food spending is ₹4,500 this month. That's 15 plates of biryani! 🍛 Try cooking at home 2 more days a week to save ₹1,500.",
  'invest': "Start small! ₹500/month in a SIP could become ₹12,000 in 2 years with compound interest. Your future self will thank you! 📈",
  'default': "Meow! I'm your AI buddy. Ask me about spending, saving, or if you can afford something! 🐱💰",
};

const AIChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (text: string): string => {
    const lower = text.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lower.includes(key)) return response;
    }
    return aiResponses.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { id: Date.now() + 1, text: getResponse(input), sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="pixel-card mb-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--pixel-cream)))' }}>
        <div className="relative">
          <span className="text-3xl">🤖</span>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-accent pixel-border-sm" style={{ boxShadow: '0 0 6px hsl(var(--accent))' }} />
        </div>
        <div>
          <h3 className="font-pixel text-[10px] text-foreground">BrokeBuddy AI</h3>
          <p className="font-retro text-sm text-accent flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-accent inline-block animate-pulse" /> Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 px-1">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: 'slide-up 0.3s ease-out backwards', animationDelay: `${i * 0.05}s` }}
          >
            <div className={`max-w-[80%] px-3 py-2.5 transition-all active:scale-98 ${
              msg.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground'
            }`}
            style={{
              border: '2px solid hsl(var(--foreground))',
              boxShadow: '2px 2px 0 hsl(var(--foreground))',
              borderRadius: msg.sender === 'user' ? '0 0 0 0' : '0 0 0 0',
            }}
            >
              <p className="font-retro text-lg">{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="pixel-border-sm bg-card px-4 py-2">
              <span className="font-retro text-lg text-muted-foreground animate-pulse">typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide">
        {['Can I afford this?', 'How to save?', 'Food spending?', 'Invest tips'].map(q => (
          <button key={q} onClick={() => { setInput(q); }}
            className="pixel-border-sm bg-muted px-3 py-1.5 font-retro text-sm whitespace-nowrap text-foreground hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all">
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask BrokeBuddy..."
          className="flex-1 pixel-border-sm bg-card px-3 py-2.5 font-retro text-lg text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-shadow"
        />
        <button onClick={sendMessage} className="pixel-btn bg-primary text-primary-foreground active:scale-90 transition-transform">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatPanel;
