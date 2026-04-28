'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Trophy, Heart, Target } from 'lucide-react'

const features = [
  {
    title: "Enter Your Scores",
    description: "Simply input your latest 5 Stableford scores. No complex tracking needed.",
    icon: Target,
    color: "text-emerald-500",
  },
  {
    title: "Join Monthly Draws",
    description: "Every entry puts you in the running for premium prizes and jackpots.",
    icon: Trophy,
    color: "text-blue-500",
  },
  {
    title: "Support Charity",
    description: "A portion of your subscription goes directly to a cause you choose.",
    icon: Heart,
    color: "text-rose-500",
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 md:pt-40 md:pb-48 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-8 text-white/80">
            Reimagining Golf for Good
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-gradient">
            Performance Meets <br className="hidden md:block" /> Purpose.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12">
            The premium platform where your golf performance fuels positive change. Subscribe, enter your scores, and win big while supporting the causes that matter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/pricing">
              <Button size="lg" className="w-full sm:w-auto">
                Join the Revolution <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/charities">
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                Explore Charities
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-4xl aspect-square bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 flex flex-col items-center text-center group"
              >
                <div className={`p-4 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-6 py-32 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">
            10% Minimum <br />
            <span className="text-primary italic">Guaranteed</span> Contribution
          </h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed">
            Every subscription helps make a difference. You choose where your impact goes. We've simplified the bridge between golf passion and philanthropic action.
          </p>
          <div className="glass-card p-12 overflow-hidden relative group">
             <div className="relative z-10">
               <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Current Monthly Pool</h4>
               <div className="text-6xl md:text-8xl font-bold text-gradient mb-8">$24,500+</div>
               <Link href="/signup">
                 <Button variant="secondary" size="lg">Start Contributing Today</Button>
               </Link>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -mr-32 -mt-32 rounded-full" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
