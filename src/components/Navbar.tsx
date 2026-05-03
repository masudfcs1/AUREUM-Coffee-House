'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart } = useCartStore();
  const itemCount = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Builder', href: '#builder' },
    { label: 'Pairings', href: '#pairings' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,165,92,0.04)' : 'none',
      }}
    >
      <div className="container-luxury flex items-center justify-between">
        {/* Logo */}
        <motion.a href="#" className="flex items-center gap-3 no-underline" whileHover={{ opacity: 0.85 }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', boxShadow: '0 2px 12px rgba(200,165,92,0.2)' }}>
            <span style={{ color: '#080808', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '16px' }}>A</span>
          </div>
          <span className="text-[18px] tracking-[0.25em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontWeight: 500 }}>
            AUREUM
          </span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <motion.a key={link.label} href={link.href}
              className="no-underline text-[11px] tracking-[0.18em] uppercase relative"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 400 }}
              whileHover={{ color: '#c8a55c' }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={toggleCart}
            className="relative w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(200,165,92,0.1)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  style={{ background: 'var(--gold)', color: '#080808', fontSize: '9px', fontWeight: 700, boxShadow: '0 2px 8px rgba(200,165,92,0.3)' }}>
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.a href="#menu" whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(200,165,92,0.25)' }} whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-2 px-8 py-3 rounded-full no-underline text-[11px] tracking-[0.16em] uppercase font-semibold"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#080808', boxShadow: '0 2px 16px rgba(200,165,92,0.15)' }}>
            Order Now
          </motion.a>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 cursor-pointer" style={{ background: 'none', border: 'none' }} onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="space-y-1.5">
              <motion.div animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7.5 : 0 }} className="w-5 h-[1.5px]" style={{ background: 'var(--gold)' }} />
              <motion.div animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }} className="w-5 h-[1.5px]" style={{ background: 'var(--gold)' }} />
              <motion.div animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7.5 : 0 }} className="w-5 h-[1.5px]" style={{ background: 'var(--gold)' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(32px)' }}>
            <div className="container-luxury py-8 flex flex-col gap-5">
              {links.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  className="no-underline text-[12px] tracking-[0.15em] uppercase py-1"
                  style={{ color: 'var(--text-secondary)' }}>{link.label}</a>
              ))}
              <a href="#menu" onClick={() => setMobileOpen(false)}
                className="btn-luxury btn-primary text-[10px] py-2.5 mt-2 no-underline text-center">Order Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
