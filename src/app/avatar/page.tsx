'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, Volume2, X, Info, Languages, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useVapi } from '@/hooks/useVapi';

export default function AIAvatar() {
    const { t } = useTranslation();
    const { connected, isConnecting, assistantIsSpeaking, volumeLevel, transcript, toggle, start, stop } = useVapi();
    const [selectedLang, setSelectedLang] = useState('english');
    const [showLangMenu, setShowLangMenu] = useState(false);

    const languages = [
        { id: 'english', name: 'English', code: 'en-US' },
        { id: 'hindi', name: 'हिन्दी (Hindi)', code: 'hi-IN' },
        { id: 'marathi', name: 'मराठी (Marathi)', code: 'mr-IN' },
        { id: 'gujarati', name: 'ગુજરાતી (Gujarati)', code: 'gu-IN' }
    ];

    const startWithLanguage = (langId: string) => {
        const lang = languages.find(l => l.id === langId);
        const config = {
            name: `Gram Era Mentor - ${lang?.name}`,
            transcriber: {
                provider: "google",
                language: lang?.code,
                model: "latest_long"
            },
            voice: {
                provider: "azure",
                voiceId: langId === 'english' ? 'en-US-AndrewNeural' :
                    langId === 'hindi' ? 'hi-IN-MadhurNeural' :
                        langId === 'marathi' ? 'mr-IN-ManoharNeural' : 'gu-IN-NiranjanNeural'
            },
            model: {
                provider: "openai",
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `You are GramSathi, a professional career mentor for rural and semi-urban youth in India. 
                        Your goal is to help them find jobs, gain skills, and understand the Gram Era platform.
                        Always speak in ${lang?.name}. Be encouraging, professional, and practical.`
                    }
                ]
            }
        };
        start(config);
        setShowLangMenu(false);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'black',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Ambience */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, var(--bg-purple) 0%, transparent 70%)',
                opacity: connected ? 0.4 : 0.1,
                transition: 'opacity 2s ease'
            }} />

            {/* Close Button */}
            <Link href="/">
                <button style={{ position: 'absolute', top: '32px', right: '32px', color: 'var(--text-muted)', zIndex: 10 }}>
                    <X size={32} />
                </button>
            </Link>

            {/* Avatar Container */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '400px', height: '400px', position: 'relative' }}>
                    {/* Animated Glow Rings */}
                    <AnimatePresence>
                        {connected && (
                            <>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.5 + (volumeLevel * 0.5), opacity: 0.2 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--accent-purple)' }}
                                />
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.8 + (volumeLevel * 0.8), opacity: 0.1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--accent-purple)' }}
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* Avatar Placeholder */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            scale: connected ? [1, 1.02, 1] : 1
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: connected
                                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.6) 0%, rgba(0,0,0,0.9) 100%)'
                                : 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(0,0,0,0.8) 100%)',
                            border: '2px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: connected
                                ? `0 0 ${50 + (volumeLevel * 100)}px rgba(168, 85, 247, 0.6)`
                                : '0 0 100px rgba(168, 85, 247, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Pulsing Core */}
                        <motion.div
                            animate={{
                                scale: connected ? [1, 1.1 + volumeLevel, 1] : 1,
                                opacity: assistantIsSpeaking ? [0.8, 1, 0.8] : 0.4
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'white', filter: 'blur(40px)' }}
                        />

                        {/* Talking Visualization */}
                        {connected && (
                            <div style={{ position: 'absolute', bottom: '100px', display: 'flex', gap: '6px' }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: assistantIsSpeaking ? [10, 30 + (volumeLevel * 100 * Math.random()), 10] : 10 }}
                                        transition={{ duration: 0.1, repeat: Infinity }}
                                        style={{ width: '8px', background: 'white', borderRadius: '4px' }}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Info / Status */}
                <div style={{ marginTop: '48px', textAlign: 'center' }}>
                    <h2 className="font-outfit" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                        {isConnecting ? "Connecting..." : connected ? "GramSathi is Listening" : "AI Video Mentor"}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {isConnecting ? "Waking up your AI guide..." :
                            connected ? "Go ahead, I am listening to you." :
                                "Click the microphone to start a voice conversation"}
                    </p>
                </div>

                {/* Controls */}
                <div style={{
                    marginTop: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '16px 32px',
                    borderRadius: '100px',
                    border: '1px solid var(--glass-border)',
                    position: 'relative'
                }}>
                    {/* Language Selector Popover */}
                    <AnimatePresence>
                        {showLangMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: -80, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    left: '0',
                                    background: 'rgba(20, 20, 20, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '20px',
                                    padding: '12px',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    minWidth: '200px',
                                    zIndex: 20
                                }}
                            >
                                {languages.map(lang => (
                                    <button
                                        key={lang.id}
                                        onClick={() => {
                                            setSelectedLang(lang.id);
                                            startWithLanguage(lang.id);
                                        }}
                                        style={{
                                            padding: '10px 16px',
                                            borderRadius: '12px',
                                            textAlign: 'left',
                                            background: selectedLang === lang.id ? 'var(--accent-purple)' : 'transparent',
                                            color: 'white',
                                            fontSize: '14px',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        className="glass-hover"
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => connected ? stop() : setShowLangMenu(!showLangMenu)}
                        className="glass-hover"
                        disabled={isConnecting}
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: connected ? 'var(--accent-purple)' : 'white',
                            color: connected ? 'white' : 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: connected ? '0 0 20px var(--accent-purple)' : 'none'
                        }}
                    >
                        {isConnecting ? <Loader2 className="animate-spin" size={28} /> : connected ? <Mic size={28} /> : <Mic size={28} />}
                    </button>

                    <button onClick={() => setShowLangMenu(!showLangMenu)} className="glass-hover" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Languages size={24} />
                        <span style={{ fontSize: '14px', opacity: 0.7 }}>{languages.find(l => l.id === selectedLang)?.name}</span>
                    </button>
                    <button className="glass-hover" style={{ color: 'white' }}><Volume2 size={24} /></button>
                    <button className="glass-hover" style={{ color: 'white' }}><Settings size={24} /></button>
                </div>
            </div>

            {/* Bottom Subtitles / Transcript */}
            <AnimatePresence>
                {(connected || transcript) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            maxWidth: '800px',
                            width: '90%',
                            background: 'rgba(0,0,0,0.8)',
                            padding: '20px 40px',
                            borderRadius: '20px',
                            border: '1px solid var(--glass-border)',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <p style={{ fontSize: '1.2rem', color: '#eee' }}>
                            {transcript || "Listening to you..."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
