import React, { useState } from 'react';

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

    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, text: getResponse(input), sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="pixel-card mb-3 flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="font-pixel text-[10px] text-foreground">BrokeBuddy AI</h3>
          <p className="font-retro text-sm text-accent">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 px-1">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: 'slide-up 0.3s ease-out' }}>
            <div className={`pixel-border-sm max-w-[80%] px-3 py-2 ${
              msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
            }`}>
              <p className="font-retro text-lg">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
        {['Can I afford this?', 'How to save?', 'Food spending?', 'Invest tips'].map(q => (
          <button key={q} onClick={() => { setInput(q); }}
            className="pixel-border-sm bg-muted px-3 py-1 font-retro text-sm whitespace-nowrap text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
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
          className="flex-1 pixel-border-sm bg-card px-3 py-2 font-retro text-lg text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button onClick={sendMessage} className="pixel-btn bg-primary text-primary-foreground">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatPanel;
