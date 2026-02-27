'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Sparkles, Bot, Loader2, Volume2, VolumeX } from 'lucide-react';
import { useVapi } from '@/hooks/useVapi';

export default function GramSathi() {
    const { t } = useTranslation();
    const { connected, isConnecting, assistantIsSpeaking, transcript, start, stop } = useVapi();
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: "Namaste! I am GramSathi, your AI career guide. Based on your profile, I see a 20% skill gap in 'Digital Marketing'. Would you like to connect with a mentor or see a learning roadmap?", type: 'text' },
        { id: 2, role: 'bot', type: 'suggestion', options: ["Show Roadmap", "Recommend Mentor", "What's SkillSwap?"] }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Update transcript in messages
    useEffect(() => {
        if (transcript) {
            setInput(transcript);
        }
    }, [transcript]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newUserMsg = { id: Date.now(), role: 'user', text: input, type: 'text' as const };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');

        // Mock AI reply (In a real app, this would come from Vapi or an API)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'bot',
                text: "I understand. I've found Arjun Sharma who specializes in exactly what you need. He is available this Wednesday. Should I book a slot for you?",
                type: 'text'
            }]);
        }, 1000);
    };

    const startVoiceCall = () => {
        const config = {
            name: "GramSathi Voice Assistant",
            transcriber: { provider: "google", language: "en-IN", model: "latest_long" },
            voice: { provider: "azure", voiceId: "hi-IN-MadhurNeural" },
            model: {
                provider: "openai",
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are GramSathi, a career assistant. Help the user with career advice and platform navigation."
                    }
                ]
            }
        };
        start(config);
    };

    return (
        <div className="container" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            <div className="glass flex-col" style={{ flex: 1, borderRadius: 'var(--radius-lg)', display: 'flex', overflow: 'hidden', maxWidth: '900px', margin: '0 auto', width: '100%', border: '1px solid var(--glass-border)' }}>

                {/* Chat Header */}
                <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--accent-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot size={24} color="white" />
                    </div>
                    <div>
                        <h2 className="font-outfit" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>AI GramSathi</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI Career Assistant • {connected ? 'Voice Active' : 'Online'}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
                        {connected && (
                            <div className="flex items-center gap-2" style={{ color: 'var(--accent-purple)', fontSize: '12px' }}>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    style={{ width: '8px', height: '8px', background: 'var(--accent-purple)', borderRadius: '50%' }}
                                />
                                Live Voice
                            </div>
                        )}
                        <button className="glass glass-hover" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Sparkles size={14} color="var(--accent-purple)" />
                            Analyzer
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                            {msg.type === 'text' && (
                                <div style={{
                                    padding: '16px 20px',
                                    borderRadius: msg.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                    background: msg.role === 'user' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                                    border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    lineHeight: '1.6'
                                }}>
                                    {msg.text}
                                </div>
                            )}

                            {msg.type === 'suggestion' && (
                                <div className="flex gap-2 flex-wrap" style={{ marginTop: '8px' }}>
                                    {msg.options?.map(opt => (
                                        <button key={opt} onClick={() => setInput(opt)} className="glass glass-hover" style={{ padding: '8px 16px', borderRadius: '30px', fontSize: '13px' }}>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '24px 32px', borderTop: '1px solid var(--glass-border)' }}>
                    <div className="flex items-center gap-4 glass" style={{ padding: '8px 8px 8px 16px', borderRadius: '40px' }}>
                        <input
                            type="text"
                            placeholder={connected ? "Listening..." : t('gramsathi.placeholder')}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            style={{ background: 'none', border: 'none', color: 'white', outline: 'none', flex: 1 }}
                        />
                        <button
                            onClick={() => connected ? stop() : startVoiceCall()}
                            disabled={isConnecting}
                            className={`glass glass-hover ${connected ? 'glow-purple' : ''}`}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: connected ? 'var(--accent-purple)' : 'var(--text-muted)',
                                background: connected ? 'rgba(168, 85, 247, 0.1)' : 'transparent'
                            }}
                        >
                            {isConnecting ? <Loader2 size={20} className="animate-spin" /> : connected ? <Volume2 size={20} /> : <Mic size={20} />}
                        </button>
                        <button
                            onClick={handleSend}
                            className="glow-purple"
                            style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', color: 'black' }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
