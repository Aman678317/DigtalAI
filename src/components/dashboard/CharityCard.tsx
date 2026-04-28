'use client'

import { Heart, Search, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const CharityCard = ({ profile }: { profile: any }) => {
  const charity = profile?.charities
  
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-rose-500" /> Selected Charity
      </h3>
      
      {charity ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="font-bold truncate">{charity.name}</div>
              <div className="text-xs text-white/40 truncate">{charity.description}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/40">Contribution</span>
              <span className="text-primary font-bold">{profile.charity_percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${profile.charity_percentage}%` }}
              ></div>
            </div>
          </div>
          
          <Link href="/charities">
            <Button variant="glass" className="w-full text-xs py-2 mt-2">Change Charity</Button>
          </Link>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-white/40 mb-4">No charity selected yet.</p>
          <Link href="/charities">
            <Button size="sm" className="w-full"><Search className="w-4 h-4 mr-2" /> Browse Charities</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
