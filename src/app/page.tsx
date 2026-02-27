'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px' }}>
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass"
          style={{
            padding: '8px 20px',
            borderRadius: '30px',
            fontSize: '14px',
            color: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            border: '1px solid var(--accent-purple)'
          }}
        >
          <Sparkles size={16} />
          {t('hero.subtitle')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-outfit text-gradient"
          style={{ fontSize: '4.5rem', fontWeight: 'bold', lineHeight: '1.1', maxWidth: '900px', marginBottom: '32px' }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '48px' }}
        >
          Connecting India's rural and urban talent through AI-driven mentorship and collaborative learning in your local language.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4"
        >
          <Link href="/discover">
            <button className="glow-purple" style={{
              background: 'white',
              color: 'black',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {t('hero.cta_primary')} <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/gramsathi">
            <button className="glass glass-hover" style={{
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '600',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {t('hero.cta_secondary')}
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Feature Section Preview */}
      <div className="grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginTop: '120px'
      }}>
        {[
          { icon: <UserCheck />, title: "Trusted Mentors", desc: "Learn from industry experts vetted by our AI matching engine." },
          { icon: <Sparkles />, title: "AI SkillSwap", desc: "Exchange your skills with others. Teach what you know, learn what you need." },
          { icon: <MessageSquare />, title: "Bilingual AI", desc: "Communicate naturally in Hindi, Bengali, Tamil and more." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
            className="glass glass-hover"
            style={{ padding: '32px', borderRadius: ' var(--radius-lg)' }}
          >
            <div style={{ color: 'var(--accent-purple)', marginBottom: '20px' }}>
              {React.cloneElement(feature.icon as React.ReactElement, { size: 40 })}
            </div>
            <h3 className="font-outfit" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
