'use client'

import { CreditCard, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const SubscriptionCard = ({ profile }: { profile: any }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary" /> Subscription
      </h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/40">Current Plan</span>
          <span className="font-medium text-white capitalize">{profile?.subscription_type || 'Monthly'}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/40">Status</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
            Active
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/40 flex items-center gap-1"><Calendar className="w-3 h-3" /> Renewal</span>
          <span className="text-white/80">May 12, 2026</span>
        </div>
      </div>
      
      <Button variant="glass" className="w-full text-sm py-2">Manage Billing</Button>
    </div>
  )
}
