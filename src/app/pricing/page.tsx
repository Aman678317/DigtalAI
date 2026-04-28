'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Check, Zap, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: "Player",
    price: 29,
    period: "month",
    description: "Ideal for individual players focused on growth and impact.",
    features: [
      "Track up to 5 rolling scores",
      "Monthly Prize Draw entry",
      "Choose any verified charity",
      "10% Minimum contribution",
      "Basic performance insights",
    ],
    cta: "Join as Player",
    popular: false,
    accent: "text-white/40"
  },
  {
    name: "Pro",
    price: 290,
    period: "year",
    description: "For the dedicated golfers committed to massive impact.",
    features: [
      "Everything in Player",
      "2 Months free annually",
      "Exclusive High-Roller draws",
      "Priority verification status",
      "Advanced AI analytics",
      "VIP Charity events access",
    ],
    cta: "Go Pro (Save 15%)",
    popular: true,
    accent: "text-primary"
  }
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planName: string) => {
    setLoading(planName)
    window.location.href = '/signup'
  }

  return (
    <div className="px-6 py-32 md:py-48 max-w-7xl mx-auto bg-mesh">
      <div className="text-center mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block"
        >
          Membership Plans
        </motion.span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-10 leading-[0.9]">Invest in Your Game. <br /> <span className="text-white/40 italic">Fund a Legacy.</span></h1>
        <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          Transparent pricing designed for golfers who play with purpose. Every plan includes a guaranteed 10% contribution to charity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`glass-card p-12 flex flex-col relative group ${plan.popular ? 'border-primary/30 ring-1 ring-primary/10' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(0,255,198,0.3)]">
                Most Popular
              </div>
            )}
            
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                {plan.popular ? <Zap className="w-5 h-5 text-primary" /> : <ShieldCheck className="w-5 h-5 text-white/20" />}
                <h3 className="text-3xl font-bold tracking-tight">{plan.name}</h3>
              </div>
              <p className="text-white/40 text-lg leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-12">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-bold text-white tracking-tighter">${plan.price}</span>
                <span className="text-white/30 text-xl font-medium">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-6 mb-16 flex-grow">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-4">
                  <div className={`mt-1.5 p-1 rounded-full ${plan.popular ? 'bg-primary/20' : 'bg-white/5'}`}>
                    <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-primary' : 'text-white/40'}`} />
                  </div>
                  <span className="text-lg text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={plan.popular ? 'neon' : 'glass'}
              size="lg"
              className="w-full h-16 text-xl"
              onClick={() => handleSubscribe(plan.name)}
              disabled={loading === plan.name}
            >
              {loading === plan.name ? 'Processing...' : plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <p className="text-white/30 text-sm flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Secure checkout powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
