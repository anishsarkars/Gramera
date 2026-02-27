'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Languages, Briefcase, Star, ArrowRightLeft } from 'lucide-react';

const mentors = [
    { id: 1, name: "Arjun Sharma", industry: "AgriTech", skills: ["Smart Farming", "IOT"], language: "Hindi, English", availability: "Mon, Wed", rating: 4.9, photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { id: 2, name: "Priya Das", industry: "Design", skills: ["UI/UX", "Branding"], language: "Bengali, English", availability: "Tue, Thu", rating: 4.8, photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: 3, name: "Karthik R.", industry: "Software", skills: ["React", "Node.js"], language: "Tamil, English", availability: "Sat, Sun", rating: 5.0, photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik" },
    { id: 4, name: "Meena Rao", industry: "Business", skills: ["Strategy", "Marketing"], language: "Kannada, English", availability: "Fri", rating: 4.7, photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meena" },
];

export default function Discover() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('mentors');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <header style={{ marginBottom: '60px', textAlign: 'center' }}>
                <h1 className="font-outfit text-gradient" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{t('discover.title')}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px' }}>
                    Connect with industry experts or swap skills with fellow learners.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setActiveTab('mentors')}
                        className={activeTab === 'mentors' ? 'glow-purple' : 'glass glass-hover'}
                        style={{
                            padding: '12px 32px',
                            borderRadius: '30px',
                            background: activeTab === 'mentors' ? 'var(--accent-purple)' : 'var(--glass-bg)',
                            fontWeight: '600',
                            border: activeTab === 'mentors' ? '1px solid white' : '1px solid var(--glass-border)'
                        }}
                    >
                        Mentors
                    </button>
                    <button
                        onClick={() => setActiveTab('skillswap')}
                        className={activeTab === 'skillswap' ? 'glow-purple' : 'glass glass-hover'}
                        style={{
                            padding: '12px 32px',
                            borderRadius: '30px',
                            background: activeTab === 'skillswap' ? 'var(--accent-purple)' : 'var(--glass-bg)',
                            fontWeight: '600',
                            border: activeTab === 'skillswap' ? '1px solid white' : '1px solid var(--glass-border)'
                        }}
                    >
                        SkillSwap Marketplace
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {activeTab === 'mentors' ? (
                    <motion.div
                        key="mentors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        {/* Filters */}
                        <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                            <div className="flex items-center gap-3 glass" style={{ padding: '10px 16px', borderRadius: '12px', flex: 1, minWidth: '250px' }}>
                                <Search size={20} color="var(--text-dim)" />
                                <input
                                    type="text"
                                    placeholder="Search industries, skills..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ background: 'none', border: 'none', color: 'white', outline: 'none', width: '100%' }}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button className="glass glass-hover flex items-center gap-2" style={{ padding: '10px 20px', borderRadius: '12px' }}>
                                    <Briefcase size={18} /> Industry
                                </button>
                                <button className="glass glass-hover flex items-center gap-2" style={{ padding: '10px 20px', borderRadius: '12px' }}>
                                    <Languages size={18} /> Language
                                </button>
                                <button className="glass glass-hover flex items-center gap-2" style={{ padding: '10px 20px', borderRadius: '12px' }}>
                                    <Filter size={18} /> Filters
                                </button>
                            </div>
                        </div>

                        {/* Mentor Cards */}
                        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
                            {mentors.map((mentor) => (
                                <motion.div
                                    key={mentor.id}
                                    whileHover={{ y: -10 }}
                                    className="glass"
                                    style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                        <img src={mentor.photo} alt={mentor.name} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-purple)' }} />
                                        <div>
                                            <h3 className="font-outfit" style={{ fontSize: '1.25rem' }}>{mentor.name}</h3>
                                            <p style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: '500' }}>{mentor.industry}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3" style={{ marginBottom: '24px' }}>
                                        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <Star size={16} color="#fcd34d" /> <span>{mentor.rating} (20+ sessions)</span>
                                        </div>
                                        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <Languages size={16} /> <span>{mentor.language}</span>
                                        </div>
                                        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <Calendar size={16} /> <span>{mentor.availability}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2" style={{ marginBottom: '24px' }}>
                                        {mentor.skills.map(skill => (
                                            <span key={skill} style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>{skill}</span>
                                        ))}
                                    </div>

                                    <button className="glow-purple" style={{ width: '100%', background: 'white', color: 'black', padding: '12px', borderRadius: '12px', fontWeight: '600' }}>
                                        {t('discover.book_now')}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="skillswap"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass"
                        style={{ padding: '60px', borderRadius: 'var(--radius-lg)' }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div style={{ width: '80px', height: '80px', background: 'var(--bg-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', border: '2px solid var(--accent-purple)' }}>
                                <ArrowRightLeft size={40} color="var(--accent-purple)" />
                            </div>
                            <h2 className="font-outfit" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t('discover.skill_swap')}</h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '48px' }}>
                                Exchange knowledge directly with other members. Teach what you excel at and learn what you need to grow.
                            </p>

                            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', width: '100%', maxWidth: '900px' }}>
                                <div className="flex flex-col gap-4 text-left">
                                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('discover.teach')}</label>
                                    <input className="glass" style={{ padding: '16px', borderRadius: '12px', color: 'white' }} placeholder="e.g. Traditional Weaving, Social Media" />
                                </div>
                                <div className="flex flex-col gap-4 text-left">
                                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('discover.learn')}</label>
                                    <input className="glass" style={{ padding: '16px', borderRadius: '12px', color: 'white' }} placeholder="e.g. Digital Marketing, Bookkeeping" />
                                </div>
                            </div>

                            <button className="glow-purple" style={{ marginTop: '48px', background: 'var(--accent-purple)', color: 'white', padding: '16px 48px', borderRadius: '40px', fontWeight: 'bold' }}>
                                Find Skill Matches
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
