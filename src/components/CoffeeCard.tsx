'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, MouseEvent, useState } from 'react';
import { CoffeeItem } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';
import { useBuilderStore } from '@/store/useBuilderStore';

interface CoffeeCardProps {
  coffee: CoffeeItem;
  index: number;
}

export default function CoffeeCard({ coffee, index }: CoffeeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const { openBuilder, update } = useBuilderStore();
  const [added, setAdded] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const handleQuickAdd = () => {
    addItem({
      id: `${coffee.id}-${Date.now()}`, name: coffee.name, image: coffee.image,
      size: 'M', milk: 'Whole', sweetness: 50, flavors: [], addons: [],
      brewMethod: 'Espresso Machine', price: coffee.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleCustomize = () => {
    const baseName = coffee.name.includes('Espresso') ? 'Espresso' : coffee.name.includes('Latte') ? 'Latte' : coffee.name.includes('Cappuccino') ? 'Cappuccino' : coffee.name.includes('Mocha') ? 'Mocha' : coffee.name.includes('Cold Brew') ? 'Cold Brew' : 'Americano';
    update('base', baseName);
    openBuilder();
  };

  const tagStyles: Record<string, { bg: string; border: string; text: string }> = {
    Bestseller: { bg: 'rgba(200,165,92,0.1)', border: 'rgba(200,165,92,0.25)', text: '#c8a55c' },
    Signature: { bg: 'rgba(168,130,255,0.08)', border: 'rgba(168,130,255,0.2)', text: '#a882ff' },
    New: { bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)', text: '#4ade80' },
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      className="group relative rounded-[var(--radius-xl)] overflow-hidden gold-border-glow"
    >
      {/* Card BG */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(168deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 100%)',
        backdropFilter: 'blur(20px)',
      }} />

      <div className="relative z-10">
        {/* ---- IMAGE AREA ---- */}
        <div className="relative h-64 overflow-hidden">
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <Image src={coffee.image} alt={coffee.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.1) 0%, rgba(8,8,8,0) 30%, rgba(8,8,8,0.7) 75%, rgba(8,8,8,0.95) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,165,92,0.03) 0%, transparent 50%)' }} />

          {/* Tag */}
          {coffee.tag && (
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase"
                style={{ background: tagStyles[coffee.tag]?.bg, color: tagStyles[coffee.tag]?.text, border: `1px solid ${tagStyles[coffee.tag]?.border}`, backdropFilter: 'blur(12px)' }}>
                {coffee.tag}
              </span>
            </div>
          )}

          {/* Origin pill */}
          <div className="absolute top-5 right-5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-[0.1em]"
              style={{ background: 'rgba(8,8,8,0.6)', color: 'var(--text-secondary)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)', boxShadow: '0 0 4px rgba(200,165,92,0.4)' }} />
              {coffee.origin}
            </span>
          </div>

          {/* Price overlay on image bottom */}
          <div className="absolute bottom-4 right-5">
            <span className="text-2xl font-light tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              ${coffee.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* ---- CONTENT ---- */}
        <div className="p-6 pt-5">
          {/* Name */}
          <h3 className="text-[22px] leading-tight mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 400, letterSpacing: '0.01em' }}>
            {coffee.name}
          </h3>

          {/* Description */}
          <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            {coffee.description}
          </p>

          {/* Flavor Notes */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {coffee.flavorNotes.map((note, i) => (
              <span key={note} className="text-[10px] tracking-[0.1em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                {note}{i < coffee.flavorNotes.length - 1 && <span className="ml-1.5" style={{ color: 'var(--text-dim)' }}>·</span>}
              </span>
            ))}
          </div>

          {/* Strength + Roast row */}
          <div className="flex items-center gap-6 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-dim)' }}>Intensity</span>
              <div className="flex gap-[3px]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-[6px] h-[6px] rounded-full transition-all duration-300"
                    style={{ background: s <= coffee.strength ? 'var(--gold)' : 'rgba(200,165,92,0.08)', boxShadow: s <= coffee.strength ? '0 0 6px rgba(200,165,92,0.3)' : 'none' }} />
                ))}
              </div>
            </div>
            <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-dim)' }}>Roast</span>
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4, 5].map((r) => (
                  <div key={r} className="w-[14px] h-[3px] rounded-full transition-all duration-300"
                    style={{ background: r <= coffee.roastLevel ? `hsl(${35 - r * 4}, 55%, ${50 - r * 8}%)` : 'rgba(255,255,255,0.03)' }} />
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(200,165,92,0.25)' }} whileTap={{ scale: 0.97 }}
              onClick={handleQuickAdd}
              className="flex-1 py-[14px] rounded-[var(--radius-md)] text-[11px] font-semibold tracking-[0.15em] uppercase cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300"
              style={{
                background: added ? 'rgba(74,222,128,0.1)' : 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                color: added ? '#4ade80' : '#080808',
                border: added ? '1px solid rgba(74,222,128,0.2)' : '1px solid transparent',
                fontFamily: 'var(--font-sans)',
                boxShadow: added ? 'none' : '0 4px 16px rgba(200,165,92,0.15)',
              }}
            >
              {added ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Added
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  Add to Cart
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(200,165,92,0.4)', background: 'rgba(200,165,92,0.08)' }} whileTap={{ scale: 0.97 }}
              onClick={handleCustomize}
              className="py-[14px] px-7 rounded-[var(--radius-md)] text-[11px] font-medium tracking-[0.12em] uppercase cursor-pointer transition-all duration-300"
              style={{ background: 'rgba(200,165,92,0.04)', color: 'var(--gold)', border: '1px solid rgba(200,165,92,0.15)', fontFamily: 'var(--font-sans)' }}>
              Customize
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
