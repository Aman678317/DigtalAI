'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { Trash2, Edit2, History } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ScoreList = ({ userId }: { userId: string }) => {
  const [scores, setScores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function fetchScores() {
      const { data } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', userId)
        .order('score_date', { ascending: false })
      
      setScores(data || [])
      setLoading(false)
    }
    fetchScores()
  }, [userId])

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('scores').delete().eq('id', id)
    if (!error) {
      setScores(scores.filter(s => s.id !== id))
      router.refresh()
    }
  }

  if (loading) return <div className="animate-pulse glass-card h-40"></div>

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <History className="w-6 h-6 text-blue-500" /> Latest 5 Scores
        </h3>
        <span className="text-xs text-white/40 font-medium uppercase tracking-widest">{scores.length}/5 Entry Limits</span>
      </div>
      
      {scores.length === 0 ? (
        <div className="p-12 text-center text-white/30 italic">
          No scores entered yet. Start by adding your first score.
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {scores.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl font-bold text-gradient">
                  {item.score}
                </div>
                <div>
                  <div className="font-semibold">{format(new Date(item.score_date), 'MMMM d, yyyy')}</div>
                  <div className="text-xs text-white/40">Stableford Points</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
