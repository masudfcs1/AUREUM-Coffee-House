'use client';

import { motion } from 'framer-motion';
import { useBuilderStore } from '@/store/useBuilderStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RECOMMENDATIONS } from '@/lib/data';

function SteamEffect() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[20%] w-40 h-48 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="steam-particle"
          style={{ left: `${15 + Math.random() * 70}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${3 + Math.random() * 2}s` }} />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { openBuilder } = useBuilderStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    const time = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    const rec = RECOMMENDATIONS.find(r => r.time === time);
    if (rec) setGreeting(rec.greeting);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 slow-zoom">
        <Image src="/images/hero-coffee.png" alt="Premium coffee" fill className="object-cover" priority quality={90} />
      </div>

      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.4) 30%, rgba(8,8,8,0.75) 65%, rgba(8,8,8,0.98) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(8,8,8,0.5) 100%)' }} />

      <SteamEffect />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {greeting && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[11px] tracking-[0.35em] uppercase mb-8"
            style={{ color: 'var(--gold)' }}>
            {greeting}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[52px] md:text-[72px] lg:text-[88px] leading-[1.05] mb-7"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.01em' }}>
          Indulge in the
          <br />
          <span className="text-gradient-gold" style={{ fontWeight: 400 }}>Art of Coffee</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-[15px] md:text-[17px] max-w-xl mx-auto mb-12 leading-[1.9]"
          style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
          Every cup is a masterpiece—handcrafted with the finest single-origin beans,
          tailored to your palate, and served with care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a href="#menu" whileHover={{ scale: 1.03, boxShadow: '0 6px 32px rgba(200,165,92,0.3)' }} whileTap={{ scale: 0.97 }}
            className="btn-luxury btn-primary no-underline text-[12px] px-12 py-[18px]">
            Explore Menu
          </motion.a>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={openBuilder} className="btn-luxury btn-outline cursor-pointer text-[12px] px-12 py-[18px]">
            Craft Your Coffee
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-[22px] h-[34px] rounded-full flex items-start justify-center pt-2"
            style={{ border: '1px solid rgba(200,165,92,0.2)' }}>
            <motion.div animate={{ opacity: [0.2, 0.7, 0.2], height: [3, 7, 3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-[1.5px] rounded-full" style={{ background: 'var(--gold)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
