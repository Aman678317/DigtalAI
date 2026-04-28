'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Target, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ScoreEntry = ({ userId }: { userId: string }) => {
  const [score, setScore] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const scoreValue = parseInt(score)
    if (isNaN(scoreValue) || scoreValue < 1 || scoreValue > 45) {
      setError('Score must be between 1 and 45')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('scores')
      .insert([
        { user_id: userId, score: scoreValue, score_date: date }
      ])

    if (insertError) {
      if (insertError.code === '23505') {
        setError('You have already entered a score for this date.')
      } else {
        setError(insertError.message)
      }
      setLoading(false)
      return
    }

    setScore('')
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <Target className="w-6 h-6 text-primary" /> Enter Recent Score
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end gap-6">
        <div className="flex-1 space-y-2 w-full">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Score (1-45)</label>
          <Input
            type="number"
            min="1"
            max="45"
            placeholder="e.g. 36"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>
        
        <div className="flex-1 space-y-2 w-full">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Date Played</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full md:w-auto h-12">
          {loading ? 'Adding...' : (
            <><Plus className="w-5 h-5 mr-2" /> Add Score</>
          )}
        </Button>
      </form>
      
      {error && (
        <p className="text-rose-500 text-sm mt-4 font-medium">{error}</p>
      )}
    </div>
  )
}
