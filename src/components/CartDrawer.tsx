'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();
  const total = totalPrice();
  const itemCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 z-[70]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[80] flex flex-col"
            style={{ background: 'linear-gradient(180deg, #111111, #0a0a0a)', borderLeft: '1px solid rgba(200,165,92,0.06)' }}>

            {/* ===== HEADER ===== */}
            <div className="px-7 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-[22px]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 400 }}>Your Order</h2>
                  {itemCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: 'rgba(200,165,92,0.1)', color: 'var(--gold)', border: '1px solid rgba(200,165,92,0.15)' }}>
                      {itemCount}
                    </span>
                  )}
                </div>
                <motion.button whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.92 }} onClick={closeCart}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: '14px' }}>✕</motion.button>
              </div>
              {items.length > 0 && (
                <motion.button whileHover={{ color: '#c8a55c' }} onClick={clearCart}
                  className="text-[10px] tracking-[0.1em] uppercase cursor-pointer mt-1"
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)' }}>Clear all</motion.button>
              )}
            </div>

            {/* ===== ITEMS ===== */}
            <div className="flex-1 overflow-y-auto px-7 py-5">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'rgba(200,165,92,0.04)', border: '1px solid rgba(200,165,92,0.06)' }}>
                      <span className="text-3xl opacity-40">☕</span>
                    </div>
                    <p className="text-[18px] mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 400 }}>Nothing here yet</p>
                    <p className="text-[12px] max-w-[200px]" style={{ color: 'var(--text-dim)' }}>Explore our menu and add your first coffee</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, idx) => (
                      <motion.div key={item.id} layout
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="group relative p-5 rounded-[var(--radius-lg)]"
                        style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.03)', transition: 'border-color 0.3s' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,165,92,0.08)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)')}>

                        <div className="flex gap-4">
                          {/* Image */}
                          <div className="relative w-16 h-16 rounded-[10px] overflow-hidden flex-shrink-0"
                            style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-[14px] leading-tight truncate pr-2"
                                style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 400 }}>
                                {item.name}
                              </h4>
                              {/* Remove */}
                              <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer flex-shrink-0"
                                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '11px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                                </svg>
                              </motion.button>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {[item.size, item.milk, ...item.flavors.slice(0, 2)].map((tag, i) => (
                                <span key={`${tag}-${i}`} className="text-[10px] tracking-[0.06em] px-2 py-[3px] rounded-[5px]"
                                  style={{ background: 'rgba(200,165,92,0.06)', color: 'var(--text-muted)', border: '1px solid rgba(200,165,92,0.06)' }}>
                                  {tag}
                                </span>
                              ))}
                              {item.flavors.length > 2 && (
                                <span className="text-[10px] px-2 py-[3px]" style={{ color: 'var(--text-dim)' }}>+{item.flavors.length - 2}</span>
                              )}
                            </div>

                            {/* Quantity + Price */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-0">
                                <motion.button whileTap={{ scale: 0.85 }} whileHover={{ background: 'rgba(200,165,92,0.06)' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-l-[8px] flex items-center justify-center text-[14px] cursor-pointer transition-colors duration-200"
                                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRight: 'none', color: 'var(--text-secondary)' }}>−</motion.button>
                                <span className="w-10 h-8 flex items-center justify-center text-[13px] font-medium tabular-nums"
                                  style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--cream)' }}>
                                  {item.quantity}
                                </span>
                                <motion.button whileTap={{ scale: 0.85 }} whileHover={{ background: 'rgba(200,165,92,0.06)' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-r-[8px] flex items-center justify-center text-[14px] cursor-pointer transition-colors duration-200"
                                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: 'none', color: 'var(--text-secondary)' }}>+</motion.button>
                              </div>
                              <motion.span key={item.price * item.quantity} initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                                className="text-[15px] font-light tabular-nums"
                                style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* ===== FOOTER ===== */}
            {items.length > 0 && (
              <div className="px-7 py-6" style={{ background: 'rgba(8,8,8,0.9)', borderTop: '1px solid rgba(200,165,92,0.04)', backdropFilter: 'blur(20px)' }}>
                {/* Subtotal lines */}
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.08em]" style={{ color: 'var(--text-dim)' }}>Subtotal</span>
                    <span className="text-[13px] tabular-nums" style={{ color: 'var(--text-secondary)' }}>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.08em]" style={{ color: 'var(--text-dim)' }}>Delivery</span>
                    <span className="text-[13px]" style={{ color: total >= 20 ? '#4ade80' : 'var(--text-secondary)' }}>
                      {total >= 20 ? 'Free' : '$2.99'}
                    </span>
                  </div>
                  <div className="h-px my-2" style={{ background: 'rgba(255,255,255,0.03)' }} />
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-medium tracking-[0.05em]" style={{ color: 'var(--text-secondary)' }}>Total</span>
                    <motion.span key={total} initial={{ y: 4, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }}
                      className="text-[26px] font-light"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>
                      ${(total + (total >= 20 ? 0 : 2.99)).toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                {/* Checkout */}
                <motion.button whileHover={{ scale: 1.01, boxShadow: '0 6px 32px rgba(200,165,92,0.3)' }} whileTap={{ scale: 0.98 }}
                  className="w-full py-[16px] rounded-[var(--radius-md)] text-[12px] font-semibold tracking-[0.16em] uppercase cursor-pointer relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#080808', border: 'none', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 24px rgba(200,165,92,0.2)' }}>
                  <span className="relative z-10">Proceed to Checkout</span>
                  <div className="absolute inset-0 shimmer" />
                </motion.button>

                {total < 20 && (
                  <p className="text-center text-[10px] mt-3 tracking-[0.05em]" style={{ color: 'var(--text-dim)' }}>
                    Add ${(20 - total).toFixed(2)} more for free delivery
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
