'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/store/useBuilderStore';
import { useCartStore } from '@/store/useCartStore';
import { calculatePrice, getFlavorProfile } from '@/lib/data';

const STEPS = [
  { label: 'Base', icon: '☕' },
  { label: 'Size & Brew', icon: '⚙️' },
  { label: 'Milk & Sweet', icon: '🥛' },
  { label: 'Flavors', icon: '✨' },
  { label: 'Extras', icon: '🎁' },
];
const BASES = ['Espresso', 'Latte', 'Cappuccino', 'Mocha', 'Americano', 'Cold Brew', 'Macchiato', 'Flat White'];
const SIZES = [
  { label: 'S', name: 'Small', ml: '240ml', icon: '○' },
  { label: 'M', name: 'Medium', ml: '350ml', icon: '◎' },
  { label: 'L', name: 'Large', ml: '470ml', icon: '◉' },
  { label: 'XL', name: 'Extra', ml: '590ml', icon: '⬤' },
];
const MILKS = [
  { label: 'Whole', extra: '' },
  { label: 'Skim', extra: '' },
  { label: 'Oat', extra: '+$0.60' },
  { label: 'Almond', extra: '+$0.60' },
  { label: 'Coconut', extra: '+$0.60' },
  { label: 'Soy', extra: '+$0.50' },
];
const FLAVORS = [
  { label: 'Caramel', emoji: '🍯' },
  { label: 'Vanilla', emoji: '🌿' },
  { label: 'Hazelnut', emoji: '🌰' },
  { label: 'Chocolate', emoji: '🍫' },
  { label: 'Cinnamon', emoji: '✦' },
  { label: 'Lavender', emoji: '💜' },
];
const ADDONS = [
  { label: 'Extra Shot', emoji: '⚡' },
  { label: 'Whipped Cream', emoji: '☁️' },
  { label: 'Chocolate Drizzle', emoji: '🍫' },
  { label: 'Caramel Drizzle', emoji: '🍯' },
  { label: 'Cocoa Powder', emoji: '✦' },
  { label: 'Marshmallows', emoji: '🤍' },
];
const BREW_METHODS = [
  { label: 'Espresso Machine', desc: 'Rich & bold' },
  { label: 'French Press', desc: 'Full-bodied' },
  { label: 'Pour Over', desc: 'Clean & bright' },
  { label: 'AeroPress', desc: 'Smooth & clear' },
];
const TEMPS = ['Iced', 'Warm', 'Hot', 'Extra Hot'];

function CupVisualization({ config }: { config: any }) {
  const isIced = config.temperature === 'Iced';
  const milkC: Record<string, string> = { Whole: '#f5e6c8', Skim: '#faf0e6', Oat: '#e8d5b7', Almond: '#f0dcc0', Coconut: '#fff8ef', Soy: '#f5ecd7' };
  const baseC: Record<string, string> = { Espresso: '#1a0e08', Latte: '#6B4A32', Cappuccino: '#5A3D28', Mocha: '#2c150a', Americano: '#120a05', 'Cold Brew': '#120a05', Macchiato: '#4c2e18', 'Flat White': '#6B4A32' };
  const fillH = { S: '30%', M: '45%', L: '60%', XL: '75%' }[config.size] || '45%';

  return (
    <div className="relative w-44 h-56 mx-auto mb-6">
      {/* Cup body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-48 overflow-hidden"
        style={{ borderRadius: '8px 8px 32px 32px', background: 'rgba(255,255,255,0.025)', border: '1.5px solid rgba(200,165,92,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 20px rgba(200,165,92,0.02)' }}>
        {/* Liquid */}
        <motion.div animate={{ height: fillH }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-0 left-0 right-0"
          style={{ background: `linear-gradient(180deg, ${milkC[config.milk] || '#f5e6c8'}30, ${baseC[config.base] || '#1a0e08'} 60%)`, borderTop: `1px solid ${milkC[config.milk] || '#f5e6c8'}15` }} />
        {/* Foam layer */}
        {['Cappuccino', 'Latte', 'Flat White'].includes(config.base) && (
          <motion.div animate={{ height: '10%', opacity: 0.5 }} className="absolute left-0 right-0"
            style={{ bottom: fillH, background: `radial-gradient(ellipse, ${milkC[config.milk]}60, transparent)` }} />
        )}
        {/* Ice cubes */}
        {isIced && [0, 1, 2].map(i => (
          <motion.div key={i} animate={{ y: [0, -2, 0], rotate: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.6 }}
            className="absolute w-3.5 h-3.5" style={{ background: 'rgba(200,230,255,0.15)', border: '1px solid rgba(200,230,255,0.1)', borderRadius: '3px', left: `${18 + i * 25}%`, bottom: `${8 + i * 10}%` }} />
        ))}
        {/* Drizzle lines */}
        {(config.flavors.includes('Caramel') || config.addons.includes('Caramel Drizzle')) && (
          <div className="absolute top-[12%] left-[10%] right-[10%] h-[2px] opacity-40 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #c8a55c, transparent, #c8a55c, transparent)' }} />
        )}
        {/* Whipped cream dome */}
        {config.addons.includes('Whipped Cream') && (
          <motion.div initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10" style={{ background: 'radial-gradient(ellipse, rgba(255,250,240,0.6), rgba(255,250,240,0.1) 70%)', borderRadius: '50%', filter: 'blur(1px)' }} />
        )}
      </div>
      {/* Handle */}
      <div className="absolute right-1 bottom-16 w-4 h-12" style={{ borderRadius: '0 12px 12px 0', border: '1.5px solid rgba(200,165,92,0.1)', borderLeft: 'none' }} />
      {/* Steam */}
      {!isIced && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-14 pointer-events-none">
          {[0, 1, 2].map(i => <div key={i} className="steam-particle" style={{ left: `${20 + i * 25}%`, animationDelay: `${i * 0.7}s`, animationDuration: '3s' }} />)}
        </div>
      )}
    </div>
  );
}

function ProfileBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] w-10 text-right tracking-[0.1em] uppercase" style={{ color: 'var(--text-dim)' }}>{label}</span>
      <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <motion.div animate={{ width: `${value}%` }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
      </div>
      <span className="text-[9px] w-7 tabular-nums" style={{ color: 'var(--text-dim)' }}>{Math.round(value)}</span>
    </div>
  );
}

export default function CoffeeBuilder() {
  const { config, activeStep, isOpen, update, toggleFlavor, toggleAddon, setStep, reset, closeBuilder } = useBuilderStore();
  const { addItem } = useCartStore();
  const price = calculatePrice(config);
  const profile = getFlavorProfile(config);

  const handleAddToCart = () => {
    addItem({
      id: `custom-${Date.now()}`, name: config.customName || `Custom ${config.base}`,
      image: '/images/hero-coffee.png', size: config.size, milk: config.milk,
      sweetness: config.sweetness, flavors: config.flavors, addons: config.addons,
      brewMethod: config.brewMethod, price,
    });
    closeBuilder();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}>
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[960px] max-h-[88vh] overflow-hidden rounded-[var(--radius-2xl)] flex flex-col"
            style={{ background: 'linear-gradient(180deg, #141414 0%, #0e0e0e 100%)', border: '1px solid rgba(200,165,92,0.08)', boxShadow: 'var(--shadow-deep)' }}>

            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between px-8 pt-7 pb-4">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: 'var(--gold)' }}>Coffee Builder</p>
                <h2 className="text-[28px]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 400 }}>Craft Your Perfect Cup</h2>
              </div>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={closeBuilder}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)', fontSize: '15px' }}>✕</motion.button>
            </div>

            {/* ===== STEP NAV ===== */}
            <div className="flex items-center gap-1 px-8 pb-5">
              {STEPS.map((step, i) => (
                <motion.button key={step.label} whileHover={{ scale: 1.02 }} onClick={() => setStep(i)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-[0.08em] cursor-pointer transition-all duration-400"
                  style={{
                    background: activeStep === i ? 'rgba(200,165,92,0.1)' : 'transparent',
                    color: activeStep === i ? 'var(--gold-light)' : 'var(--text-dim)',
                    border: `1px solid ${activeStep === i ? 'rgba(200,165,92,0.2)' : 'transparent'}`,
                    fontFamily: 'var(--font-sans)', fontWeight: activeStep === i ? 500 : 400,
                  }}>
                  <span className="text-sm">{step.icon}</span>
                  <span className="hidden sm:inline">{step.label}</span>
                </motion.button>
              ))}
              {/* Progress line */}
              <div className="flex-1 h-[1px] ml-2" style={{ background: `linear-gradient(90deg, rgba(200,165,92,0.15) ${((activeStep + 1) / STEPS.length) * 100}%, rgba(255,255,255,0.02) 0%)` }} />
            </div>

            {/* ===== CONTENT ===== */}
            <div className="flex-1 overflow-y-auto px-8 pb-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left: Options (3 cols) */}
                <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeStep} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: 0.25 }}>

                      {activeStep === 0 && (
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-dim)' }}>Choose your coffee base</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {BASES.map(b => (
                              <motion.button key={b} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => update('base', b)}
                                className={`option-chip ${config.base === b ? 'selected' : ''}`}>
                                <span className="text-[13px] font-medium" style={{ color: config.base === b ? 'var(--cream)' : 'var(--text-secondary)' }}>{b}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeStep === 1 && (
                        <div className="space-y-8">
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-dim)' }}>Cup Size</p>
                            <div className="grid grid-cols-4 gap-3">
                              {SIZES.map(s => (
                                <motion.button key={s.label} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => update('size', s.label)}
                                  className={`option-chip ${config.size === s.label ? 'selected' : ''}`}>
                                  <span className="text-lg mb-1" style={{ color: config.size === s.label ? 'var(--gold)' : 'var(--text-dim)' }}>{s.icon}</span>
                                  <span className="text-[13px] font-medium" style={{ color: config.size === s.label ? 'var(--cream)' : 'var(--text-secondary)' }}>{s.name}</span>
                                  <span className="text-[10px] mt-0.5" style={{ color: 'var(--text-dim)' }}>{s.ml}</span>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-dim)' }}>Brew Method</p>
                            <div className="grid grid-cols-2 gap-3">
                              {BREW_METHODS.map(m => (
                                <motion.button key={m.label} whileHover={{ y: -2 }} onClick={() => update('brewMethod', m.label)}
                                  className={`option-chip ${config.brewMethod === m.label ? 'selected' : ''}`} style={{ flexDirection: 'row', gap: '12px', justifyContent: 'flex-start', padding: '14px 16px' }}>
                                  <div className="text-left">
                                    <div className="text-[13px] font-medium" style={{ color: config.brewMethod === m.label ? 'var(--cream)' : 'var(--text-secondary)' }}>{m.label}</div>
                                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-dim)' }}>{m.desc}</div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-dim)' }}>Temperature</p>
                            <div className="grid grid-cols-4 gap-3">
                              {TEMPS.map(t => (
                                <motion.button key={t} whileHover={{ y: -2 }} onClick={() => update('temperature', t)}
                                  className={`option-chip ${config.temperature === t ? 'selected' : ''}`}>
                                  <span className="text-[13px]" style={{ color: config.temperature === t ? 'var(--cream)' : 'var(--text-secondary)' }}>{t}</span>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-8">
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-dim)' }}>Milk Type</p>
                            <div className="grid grid-cols-3 gap-3">
                              {MILKS.map(m => (
                                <motion.button key={m.label} whileHover={{ y: -2 }} onClick={() => update('milk', m.label)}
                                  className={`option-chip ${config.milk === m.label ? 'selected' : ''}`}>
                                  <span className="text-[13px] font-medium" style={{ color: config.milk === m.label ? 'var(--cream)' : 'var(--text-secondary)' }}>{m.label}</span>
                                  {m.extra && <span className="text-[9px] mt-0.5" style={{ color: 'var(--gold-dark)' }}>{m.extra}</span>}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-dim)' }}>Sweetness Level</p>
                              <span className="text-[13px] font-medium tabular-nums" style={{ color: 'var(--gold)' }}>{config.sweetness}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={config.sweetness} onChange={e => update('sweetness', Number(e.target.value))} className="w-full" />
                            <div className="flex justify-between mt-3">
                              <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>No sugar</span>
                              <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>Extra sweet</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 3 && (
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--text-dim)' }}>Add flavor syrups</p>
                          <p className="text-[11px] mb-5" style={{ color: 'var(--text-dim)' }}>$0.50 each · Select as many as you like</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {FLAVORS.map(f => {
                              const on = config.flavors.includes(f.label);
                              return (
                                <motion.button key={f.label} whileHover={{ y: -2 }} onClick={() => toggleFlavor(f.label)}
                                  className={`option-chip ${on ? 'selected' : ''}`} style={{ flexDirection: 'row', gap: '10px', justifyContent: 'flex-start', padding: '14px 16px' }}>
                                  <span className="text-base">{f.emoji}</span>
                                  <span className="text-[13px]" style={{ color: on ? 'var(--cream)' : 'var(--text-secondary)' }}>{f.label}</span>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeStep === 4 && (
                        <div className="space-y-8">
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--text-dim)' }}>Add-ons & toppings</p>
                            <p className="text-[11px] mb-5" style={{ color: 'var(--text-dim)' }}>$0.70 each</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {ADDONS.map(a => {
                                const on = config.addons.includes(a.label);
                                return (
                                  <motion.button key={a.label} whileHover={{ y: -2 }} onClick={() => toggleAddon(a.label)}
                                    className={`option-chip ${on ? 'selected' : ''}`} style={{ flexDirection: 'row', gap: '10px', justifyContent: 'flex-start', padding: '14px 16px' }}>
                                    <span className="text-base">{a.emoji}</span>
                                    <span className="text-[13px]" style={{ color: on ? 'var(--cream)' : 'var(--text-secondary)' }}>{a.label}</span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text-dim)' }}>Name Your Creation</p>
                            <input type="text" placeholder="e.g. Masud Special" value={config.customName} onChange={e => update('customName', e.target.value)}
                              className="w-full px-4 py-3 rounded-[var(--radius-md)] text-[14px] outline-none transition-all duration-300 focus:border-[rgba(200,165,92,0.3)]"
                              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--cream)', fontFamily: 'var(--font-serif)', fontSize: '16px', letterSpacing: '0.02em' }} />
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right: Preview (2 cols) */}
                <div className="lg:col-span-2 flex flex-col items-center">
                  <div className="sticky top-0 pt-2 w-full">
                    {/* Cup */}
                    <div className="py-6 px-4 rounded-[var(--radius-xl)] mb-4"
                      style={{ background: 'rgba(255,255,255,0.012)', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <CupVisualization config={config} />
                      {/* Current config summary */}
                      <div className="text-center">
                        <p className="text-[15px] mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)' }}>
                          {config.customName || config.base}
                        </p>
                        <p className="text-[10px] tracking-[0.1em]" style={{ color: 'var(--text-dim)' }}>
                          {config.size} · {config.milk} · {config.temperature}
                        </p>
                      </div>
                    </div>

                    {/* Flavor Profile */}
                    <div className="p-5 rounded-[var(--radius-xl)]" style={{ background: 'rgba(255,255,255,0.012)', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-center mb-4" style={{ color: 'var(--text-dim)' }}>Flavor Profile</p>
                      <div className="space-y-2.5">
                        <ProfileBar label="Sweet" value={profile.sweet} color="#c8a55c" />
                        <ProfileBar label="Bitter" value={profile.bitter} color="#7a5c3a" />
                        <ProfileBar label="Bold" value={profile.strong} color="#8b6cc8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="flex items-center justify-between px-8 py-5"
              style={{ background: 'rgba(8,8,8,0.8)', borderTop: '1px solid rgba(200,165,92,0.06)', backdropFilter: 'blur(20px)' }}>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-dim)' }}>Your Total</p>
                <motion.p key={price} initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}
                  className="text-[32px] font-light" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>
                  ${price.toFixed(2)}
                </motion.p>
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} onClick={reset}
                  className="px-7 py-3.5 rounded-full text-[11px] tracking-[0.12em] uppercase cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                  Reset
                </motion.button>
                <motion.button whileHover={{ scale: 1.03, boxShadow: '0 6px 32px rgba(200,165,92,0.3)' }} whileTap={{ scale: 0.97 }} onClick={handleAddToCart}
                  className="btn-luxury btn-primary cursor-pointer text-[12px] py-4 px-10">
                  Add to Cart — ${price.toFixed(2)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
