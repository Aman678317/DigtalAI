'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  Heart, 
  Trophy, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalPrizePool: 0,
    pendingVerifications: 0
  })
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      // Fetch some stats
      // This would normally be a series of counts or a dedicated RPC
      setStats({
        totalUsers: 142,
        activeSubscriptions: 128,
        totalPrizePool: 24500,
        pendingVerifications: 3
      })
      setLoading(false)
    }
    checkAdmin()
  }, [])

  if (loading) return <div className="min-h-screen bg-background"></div>

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 space-y-8 flex flex-col">
        <div className="text-xl font-bold tracking-tight text-white px-2">
          AURA<span className="text-primary">ADMIN</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
            <BarChart3 className="w-5 h-5" /> Analytics
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
            <Users className="w-5 h-5" /> Users
          </Link>
          <Link href="/admin/charities" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
            <Heart className="w-5 h-5" /> Charities
          </Link>
          <Link href="/admin/draws" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
            <Trophy className="w-5 h-5" /> Draws
          </Link>
          <Link href="/admin/verifications" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 transition-colors">
            <ShieldCheck className="w-5 h-5" /> Winners
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <Button variant="glass" className="w-full justify-start text-rose-500 hover:text-rose-400">
            <LogOut className="w-4 h-4 mr-2" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
          <p className="text-white/40">Real-time metrics and system status.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500' },
            { label: 'Active Subs', value: stats.activeSubscriptions, icon: Clock, color: 'text-emerald-500' },
            { label: 'Prize Pool', value: `$${stats.totalPrizePool}`, icon: Trophy, color: 'text-amber-500' },
            { label: 'Pending Proofs', value: stats.pendingVerifications, icon: ShieldCheck, color: 'text-rose-500' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity / Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-lg font-bold mb-6">Upcoming Monthly Draw</h3>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-white/40 mb-1">Scheduled Date</div>
                  <div className="font-semibold">May 1, 2026</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/40 mb-1">Status</div>
                  <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">Awaiting Simulation</div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5 flex gap-4">
                <Button variant="secondary" size="sm" className="flex-1">Run Simulation</Button>
                <Button size="sm" className="flex-1">Publish Result</Button>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-bold mb-6">Winner Verifications</h3>
            <div className="space-y-4">
              {[
                { name: 'Alex Thompson', match: '5 Number Match', amount: '$9,800' },
                { name: 'Sarah Miller', match: '4 Number Match', amount: '$1,200' },
              ].map((winner) => (
                <div key={winner.name} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold">
                      {winner.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{winner.name}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{winner.match}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-primary">{winner.amount}</div>
                    <Link href="/admin/verifications" className="text-[10px] text-white/40 hover:text-white underline">Verify Proof</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
