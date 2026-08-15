'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello! I am your personal SkinAI Dermatology Assistant. Ask me about mixing active ingredients, pore treatment, or your biometric skin score.",
    timestamp: 'Just now',
    quickPrompts: [
      'Can I mix Niacinamide with Vitamin C?',
      'How to treat enlarged pores?',
      'Explain my 84/100 skin score'
    ]
  }
];

export const AIChatPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Based on your clinical telemetry metrics, we recommend maintaining lipid barrier hydration while incorporating gentle BHA micro-exfoliation.";
      
      const lower = text.toLowerCase();
      if (lower.includes('niacinamide') || lower.includes('vitamin c')) {
        replyText = "Yes! Modern pH-stable formulations allow Niacinamide (2-5%) and Vitamin C (L-Ascorbic Acid) to be used together safely. Apply Vitamin C first on clean skin, wait 2 minutes, then follow with Niacinamide.";
      } else if (lower.includes('pore') || lower.includes('blackhead')) {
        replyText = "Enlarged pores and nasal comedones respond best to 2% Encapsulated Salicylic Acid (BHA) and 0.3% Retinol at night to clear sebum plugs and boost follicular collagen support.";
      } else if (lower.includes('score') || lower.includes('84')) {
        replyText = "Your 84/100 score indicates high overall epidermal clarity! Your T-Zone oiliness (62/100) is your primary focus area for balancing.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        quickPrompts: ['What products match my score?', 'How to soothe redness?']
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-16 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-2xl shadow-violet-500/40 flex items-center justify-center border border-white/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
      </motion.button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-28 right-6 z-50 w-full max-w-sm sm:max-w-md h-[500px] glass-panel bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl flex flex-col justify-between overflow-hidden rounded-3xl"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-[var(--text-primary)]">
                    SkinAI Assistant
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dermatology AI Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Scroll Area */}
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-none'
                      : 'glass-card bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Prompt chips */}
                  {msg.quickPrompts && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.quickPrompts.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:scale-105 transition-transform"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl glass-card w-fit">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about active ingredients or score..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 rounded-xl bg-violet-600 text-white hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
