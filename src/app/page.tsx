'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CoffeeCard from '@/components/CoffeeCard';
import CoffeeBuilder from '@/components/CoffeeBuilder';
import CartDrawer from '@/components/CartDrawer';
import PairingsSection from '@/components/PairingsSection';
import RecommendationSection from '@/components/RecommendationSection';
import Footer from '@/components/Footer';
import { COFFEE_MENU } from '@/lib/data';
import { useBuilderStore } from '@/store/useBuilderStore';

export default function Home() {
  const { openBuilder } = useBuilderStore();

  return (
    <>
      <Navbar />
      <HeroSection />

      {/* ===== MENU SECTION ===== */}
      <section id="menu" className="section-padding relative">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 15%, rgba(200,165,92,0.025) 0%, transparent 50%)' }} />
        <div className="container-luxury relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Our Collection</p>
            <h2 className="text-[40px] md:text-[48px] mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 300 }}>
              Premium Coffee Menu
            </h2>
            <div className="divider-gold mb-5" />
            <p className="text-[14px] max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
              Each blend is carefully sourced and artfully prepared
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COFFEE_MENU.map((coffee, i) => (
              <CoffeeCard key={coffee.id} coffee={coffee} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUILDER CTA ===== */}
      <section id="builder" className="section-padding relative overflow-hidden">
        <div className="container-luxury relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center py-20 md:py-28 px-8 rounded-[var(--radius-2xl)] relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.012)', border: '1px solid rgba(200,165,92,0.06)' }}>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 shimmer" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,165,92,0.2), transparent)' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,165,92,0.1), transparent)' }} />

            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--gold)' }}>Personalize</p>
              <h2 className="text-[40px] md:text-[56px] leading-[1.1] mb-3"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontWeight: 300 }}>
                Craft Your
              </h2>
              <h2 className="text-[40px] md:text-[56px] leading-[1.1] mb-8">
                <span className="text-gradient-gold" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Signature Blend</span>
              </h2>
              <p className="text-[14px] max-w-lg mx-auto mb-10 leading-[1.8]"
                style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
                Choose your base, milk, flavors, and extras. Watch your creation come to life with our interactive builder.
              </p>
              <motion.button whileHover={{ scale: 1.04, boxShadow: '0 6px 32px rgba(200,165,92,0.3)' }} whileTap={{ scale: 0.96 }}
                onClick={openBuilder}
                className="btn-luxury btn-primary cursor-pointer text-[12px] px-12 py-[18px]">
                Open Coffee Builder
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <PairingsSection />
      <RecommendationSection />
      <Footer />

      <CoffeeBuilder />
      <CartDrawer />
    </>
  );
}
