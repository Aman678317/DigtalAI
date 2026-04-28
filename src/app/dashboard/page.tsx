'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Trophy, Target, Heart, Calendar, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react'
import { ScoreEntry } from '@/components/dashboard/ScoreEntry'
import { ScoreList } from '@/components/dashboard/ScoreList'
import { SubscriptionCard } from '@/components/dashboard/SubscriptionCard'
import { CharityCard } from '@/components/dashboard/CharityCard'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const { data: profile } = await supabase
        .from('profiles')
        .select(`*, charities(*)`)
        .eq('id', user.id)
        .single()
      
      setProfile(profile)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto space-y-12">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome, {profile?.full_name?.split(' ')[0] || 'Player'}</h1>
          <p className="text-white/40">Ready for your next round? Enter your scores below.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Status: Active
          </div>
          <div className="glass-card px-4 py-2">
            Next Draw: May 1, 2026
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Scores */}
        <div className="lg:col-span-2 space-y-8">
          <ScoreEntry userId={user.id} />
          <ScoreList userId={user.id} />
        </div>

        {/* Right Column: Cards */}
        <div className="space-y-8">
          <SubscriptionCard profile={profile} />
          <CharityCard profile={profile} />
          
          {/* Winner Proof Upload */}
          {profile?.is_winner && (
            <div className="glass-card p-6 border-primary/50 ring-1 ring-primary/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> You Won!
              </h3>
              <p className="text-xs text-white/60 mb-4">Upload a screenshot of your score proof to claim your prize.</p>
              <Button size="sm" className="w-full">Upload Proof</Button>
            </div>
          )}
          
          {/* Quick Stats */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Winnings
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-white/60 text-sm">Total Prize Pool</span>
                <span className="font-bold text-gradient">$24,500</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-white/60 text-sm">Your Winnings</span>
                <span className="font-bold">$0.00</span>
              </div>
            </div>
            <Button variant="glass" className="w-full mt-6 text-sm">View Draw History <ChevronRight className="ml-1 w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
