'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PAIRINGS } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';

export default function PairingsSection() {
  const { addItem } = useCartStore();

  return (
    <section id="pairings" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,165,92,0.03) 0%, transparent 55%)' }} />

      <div className="container-luxury relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Curated for You</p>
          <h2 className="text-[40px] md:text-[48px] mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 300 }}>Perfect Pairings</h2>
          <div className="divider-gold mb-5" />
          <p className="text-[14px] max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Harmonious combinations curated by our baristas</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAIRINGS.map((pair, i) => (
            <motion.div key={pair.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group rounded-[var(--radius-xl)] overflow-hidden gold-border-glow"
              style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div className="relative h-52 overflow-hidden">
                <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }}>
                  <Image src={pair.image} alt={pair.coffee} fill className="object-cover" />
                </motion.div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(8,8,8,0.95) 100%)' }} />
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.1em]"
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#080808', boxShadow: '0 2px 12px rgba(200,165,92,0.2)' }}>
                  {pair.discount}% OFF
                </motion.span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[15px]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>{pair.coffee}</span>
                  <span className="text-[10px]" style={{ color: 'var(--gold-dark)' }}>+</span>
                  <span className="text-[15px]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>{pair.food}</span>
                </div>
                <p className="text-[12px] mb-5 leading-relaxed" style={{ color: 'var(--text-dim)' }}>{pair.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[22px] font-light" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>${pair.comboPrice.toFixed(2)}</span>
                  <motion.button whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(200,165,92,0.2)' }} whileTap={{ scale: 0.96 }}
                    onClick={() => addItem({ id: `combo-${Date.now()}`, name: `${pair.coffee} + ${pair.food}`, image: pair.image, size: 'M', milk: 'Whole', sweetness: 50, flavors: [], addons: [], brewMethod: 'Espresso Machine', price: pair.comboPrice })}
                    className="px-6 py-3 rounded-full text-[11px] tracking-[0.14em] uppercase font-semibold cursor-pointer"
                    style={{ background: 'rgba(200,165,92,0.1)', color: 'var(--gold)', border: '1px solid rgba(200,165,92,0.18)', fontFamily: 'var(--font-sans)' }}>
                    Add Combo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
