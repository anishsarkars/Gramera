'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Globe, User, Menu, X } from 'lucide-react';
import '../i18n/config';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', name: 'EN' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'ta', name: 'தமிழ்' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass' : ''}`}
            style={{ padding: scrolled ? '12px 0' : '20px 0', borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none' }}>
            <div className="container flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div style={{ width: '32px', height: '32px', background: 'var(--accent-purple)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>G</span>
                    </div>
                    <span className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>Gram Era</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden-mobile flex gap-8 items-center">
                    <Link href="/discover" className="nav-link">{t('nav.discover')}</Link>
                    <Link href="/gramsathi" className="nav-link">{t('nav.gramSathi')}</Link>
                    <Link href="/avatar" className="nav-link">{t('nav.avatar')}</Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 glass" style={{ padding: '6px 12px', borderRadius: '30px', fontSize: '14px' }}>
                        <Globe size={16} />
                        <select
                            onChange={(e) => changeLanguage(e.target.value)}
                            style={{ background: 'none', color: 'white', border: 'none', cursor: 'pointer', outline: 'none', fontSize: '12px', fontWeight: '500' }}
                            value={i18n.language}
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code} style={{ background: '#1a0b2e' }}>{lang.name}</option>
                            ))}
                        </select>
                    </div>

                    <button className="flex items-center gap-2 glass glass-hover" style={{ padding: '8px 16px', borderRadius: '30px' }}>
                        <User size={18} />
                        <span className="hidden-mobile">{t('nav.login')}</span>
                    </button>

                    <button className="visible-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <style jsx>{`
        .nav-link {
          color: var(--text-muted);
          font-weight: 500;
          transition: var(--transition);
          font-size: 0.95rem;
        }
        .nav-link:hover {
          color: white;
        }
        .hidden-mobile {
          display: flex;
        }
        .visible-mobile {
          display: none;
        }
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none;
          }
          .visible-mobile {
            display: block;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
