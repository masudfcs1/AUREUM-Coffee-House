'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RECOMMENDATIONS } from '@/lib/data';

export default function RecommendationSection() {
  const [rec, setRec] = useState<typeof RECOMMENDATIONS[0] | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    const time = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    setRec(RECOMMENDATIONS.find(r => r.time === time) || RECOMMENDATIONS[0]);
  }, []);

  const suggestions = [
    { label: 'Morning Ritual', icon: '☀️', desc: 'Start bright and bold', gradient: 'rgba(255,180,50,0.04)' },
    { label: 'Energy Boost', icon: '⚡', desc: 'Maximum intensity', gradient: 'rgba(200,165,92,0.04)' },
    { label: 'Evening Calm', icon: '🌙', desc: 'Smooth and soothing', gradient: 'rgba(130,100,200,0.04)' },
    { label: 'Cool Down', icon: '❄️', desc: 'Refreshing iced picks', gradient: 'rgba(100,180,255,0.04)' },
  ];

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(200,165,92,0.02) 0%, transparent 50%)' }} />

      <div className="container-luxury relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Intelligent Picks</p>
          <h2 className="text-[40px] md:text-[48px] mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 300 }}>Recommended for You</h2>
          <div className="divider-gold mb-5" />
          <p className="text-[14px] max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Curated suggestions based on time and preference</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestions.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, borderColor: 'rgba(200,165,92,0.15)' }}
              className="p-6 rounded-[var(--radius-xl)] text-center cursor-pointer"
              style={{ background: s.gradient, border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.4s ease' }}>
              <div className="text-2xl mb-3">{s.icon}</div>
              <h4 className="text-[13px] font-medium mb-1.5" style={{ color: 'var(--cream)', fontFamily: 'var(--font-sans)' }}>{s.label}</h4>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-dim)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
