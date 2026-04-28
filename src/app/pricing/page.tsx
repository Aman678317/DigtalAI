'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: "Monthly",
    price: 29,
    period: "month",
    description: "Perfect for casual golfers starting their journey.",
    features: [
      "Enter up to 5 scores",
      "Monthly prize draw entry",
      "Choose your charity",
      "10% minimum contribution",
      "Performance analytics",
    ],
    cta: "Start Monthly",
    popular: false,
  },
  {
    name: "Yearly",
    price: 290,
    period: "year",
    description: "Best value for dedicated players and supporters.",
    features: [
      "Everything in Monthly",
      "2 months free included",
      "Exclusive yearly draws",
      "Early access to events",
      "Priority winner verification",
    ],
    cta: "Get Yearly",
    popular: true,
  }
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planName: string) => {
    setLoading(planName)
    // Here we would call the Stripe checkout API
    // For now, redirect to signup or dashboard
    window.location.href = '/signup'
  }

  return (
    <div className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Simple, Transparent <br className="hidden md:block" /> Pricing</h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto">
          Join Aura Golf and start making an impact with every swing. Choose the plan that fits your lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass-card p-10 flex flex-col relative ${plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-white/40 text-sm">{plan.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-white/40">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-12 flex-grow">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-1 p-0.5 rounded-full bg-primary/20">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={plan.popular ? 'secondary' : 'glass'}
              size="lg"
              className="w-full"
              onClick={() => handleSubscribe(plan.name)}
              disabled={loading === plan.name}
            >
              {loading === plan.name ? 'Processing...' : plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
