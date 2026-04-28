'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Trophy, Heart, Target, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

const features = [
  {
    title: "Enter Your Scores",
    description: "Easily input your latest scores without complex tracking. Keep your focus on the game.",
    icon: Target,
    color: "text-emerald-400",
  },
  {
    title: "Join Monthly Draws",
    description: "Compete for premium rewards and massive jackpots every single month.",
    icon: Trophy,
    color: "text-blue-400",
  },
  {
    title: "Support Causes",
    description: "A portion of every subscription goes directly to a charity of your choice.",
    icon: Heart,
    color: "text-rose-400",
  },
]

const steps = [
  {
    id: "01",
    title: "Sign Up",
    description: "Create your premium account in seconds. Seamless and secure.",
  },
  {
    id: "02",
    title: "Enter Scores",
    description: "Track your golf performance with our minimal, elegant interface.",
  },
  {
    id: "03",
    title: "Make Impact",
    description: "Win exclusive rewards while fueling global positive change.",
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-mesh">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-32 md:pt-48 md:pb-56 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold uppercase tracking-widest mb-10 text-primary"
          >
            Not just a game. A movement.
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tight mb-10 leading-[0.9] text-white">
            Performance <br />
            <span className="text-primary italic">Meets Purpose.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-16 leading-relaxed">
            Turn your golf scores into real-world impact. Track performance, join elite draws, and fuel the charities you love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup">
              <Button variant="neon" size="lg" className="w-full sm:w-auto h-16 px-10 text-xl">
                Get Started Free <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link href="/charities">
              <Button variant="glass" size="lg" className="w-full sm:w-auto h-16 px-10 text-xl">
                Explore Charities
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-6xl aspect-square bg-primary/10 blur-[160px] rounded-full opacity-40 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="px-6 py-32 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-10 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 mb-8 flex items-center justify-center group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-6 py-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight leading-tight">
              10% Guaranteed <br />
              <span className="text-primary italic">Contribution.</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 leading-relaxed">
              Every subscription directly supports verified charities. We've simplified the bridge between your passion for golf and global philanthropic action.
            </p>
            
            <div className="space-y-6">
              {[
                "100% Transparent Tracking",
                "Choose from 50+ Verified Charities",
                "Tax-deductible contributions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 text-white/80">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-12 relative overflow-hidden group"
          >
             <div className="relative z-10">
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 mb-6 block">Platform Statistics</span>
               <div className="text-7xl md:text-8xl font-bold mb-4 text-white">$24,500+</div>
               <div className="text-xl text-white/40 mb-12">Raised by players like you this month alone.</div>
               <Link href="/signup">
                 <Button variant="neon" size="lg" className="w-full">Start Contributing Now</Button>
               </Link>
             </div>
             <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-6 py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Simple. Impactful.</h2>
            <p className="text-xl text-white/40">Three steps to change the world with your game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-8xl font-black text-white/5 absolute -top-12 -left-4 -z-10">{step.id}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-40 text-center relative">
        <div className="max-w-4xl mx-auto glass-card p-20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Play better. <br /> Win bigger. Give back.</h2>
            <p className="text-xl text-white/50 mb-12">Join the platform where performance drives purpose.</p>
            <Link href="/signup">
              <Button variant="neon" size="lg" className="h-16 px-12 text-xl">Join Now</Button>
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
        </div>
      </section>
    </div>
  )
}
