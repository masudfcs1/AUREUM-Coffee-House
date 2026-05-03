'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: '1px solid rgba(200,165,92,0.04)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(200,165,92,0.01))' }} />

      <div className="container-luxury relative z-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-14">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                <span style={{ color: '#080808', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '16px' }}>A</span>
              </div>
              <span className="text-[18px] tracking-[0.25em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontWeight: 500 }}>AUREUM</span>
            </div>
            <p className="text-[13px] leading-[1.8]" style={{ color: 'var(--text-dim)', fontWeight: 300 }}>
              Crafting exceptional coffee experiences since 2020. Every cup tells a story of origin, craft, and care.
            </p>
          </div>

          {[
            { title: 'Explore', links: ['Menu', 'Coffee Builder', 'Pairings', 'Our Story'] },
            { title: 'Support', links: ['FAQ', 'Contact Us', 'Shipping', 'Returns'] },
            { title: 'Connect', links: ['Instagram', 'Twitter', 'LinkedIn', 'TikTok'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{col.title}</h4>
              <ul className="space-y-3" style={{ listStyle: 'none', padding: 0 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <motion.a href="#" whileHover={{ x: 3, color: '#c8a55c' }}
                      className="text-[12px] no-underline inline-block" style={{ color: 'var(--text-dim)', transition: 'color 0.3s', fontWeight: 300 }}>{l}</motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
          <p className="text-[11px]" style={{ color: 'var(--text-dim)', fontWeight: 300 }}>© 2026 AUREUM Coffee. All rights reserved.</p>
          <p className="text-[11px]" style={{ color: 'var(--text-dim)', fontWeight: 300 }}>Crafted with ♥ and single-origin espresso</p>
        </div>
      </div>
    </footer>
  );
}
