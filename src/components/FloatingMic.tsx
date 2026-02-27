'use client';

import React, { useState } from 'react';
import { Mic, X, Volume2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setIsListening(true);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                className="glass glow-purple"
                style={{
                    position: 'fixed',
                    bottom: '32px',
                    right: '32px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    border: '1px solid var(--accent-purple)',
                    background: 'rgba(168, 85, 247, 0.2)',
                    color: 'white',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleOverlay}
            >
                <Mic size={28} />
            </motion.button>

            {/* Voice Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1000,
                            background: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ position: 'absolute', top: '32px', right: '32px', color: 'var(--text-muted)' }}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center gap-8 text-center max-w-lg">
                            <motion.div
                                animate={{
                                    scale: isListening ? [1, 1.2, 1] : 1,
                                    boxShadow: isListening ? ['0 0 20px rgba(168, 85, 247, 0.3)', '0 0 60px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.3)'] : 'none'
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-purple)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    marginBottom: '24px'
                                }}
                            >
                                <Mic size={48} />
                            </motion.div>

                            <h2 className="font-outfit" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                {isListening ? "Listening to you..." : "How can I help you?"}
                            </h2>

                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                Ask GramSathi about career, mentors, or skills in your preferred language.
                            </p>

                            <div className="flex gap-4" style={{ marginTop: '24px' }}>
                                <div className="glass" style={{ padding: '12px 24px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Volume2 size={18} color="var(--accent-purple)" />
                                    <span style={{ fontSize: '14px' }}>Voice Output On</span>
                                </div>
                                <div className="glass" style={{ padding: '12px 24px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Sparkles size={18} color="#fcd34d" />
                                    <span style={{ fontSize: '14px' }}>Smart Routing</span>
                                </div>
                            </div>

                            {isListening && (
                                <div className="flex items-end gap-1" style={{ height: '40px', marginTop: '40px' }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                            style={{
                                                width: '4px',
                                                background: 'var(--accent-purple)',
                                                borderRadius: '2px'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingMic;
