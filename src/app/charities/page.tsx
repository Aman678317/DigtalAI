'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Heart, Filter, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function CharitiesPage() {
  const [charities, setCharities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function fetchCharities() {
      const { data } = await supabase
        .from('charities')
        .select('*')
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
      
      setCharities(data || [])
      setLoading(false)
    }
    fetchCharities()
  }, [])

  const filteredCharities = charities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gradient">Make an Impact.</h1>
          <p className="text-lg text-white/50">
            Browse our curated list of verified charities. From local community projects to global environmental initiatives, find the cause that resonates with you.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input 
            className="pl-11" 
            placeholder="Search causes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass-card h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCharities.map((charity, index) => (
            <motion.div
              key={charity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card group overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden bg-white/5 relative">
                {charity.image_url ? (
                  <img 
                    src={charity.image_url} 
                    alt={charity.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white/10" />
                  </div>
                )}
                {charity.is_featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{charity.name}</h3>
                <p className="text-white/50 text-sm line-clamp-3 mb-8 flex-grow">
                  {charity.description}
                </p>
                
                <Link href={`/charities/${charity.id}`}>
                  <Button variant="glass" className="w-full group-hover:bg-white/10">
                    View Profile <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
