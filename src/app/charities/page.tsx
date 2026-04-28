'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Heart, ChevronRight, Globe, ShieldCheck } from 'lucide-react'
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
    <div className="px-6 py-32 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div className="max-w-3xl">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block"
          >
            Verified Impact Partners
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">Choose Your <br /> <span className="text-white/40 italic">Legacy.</span></h1>
          <p className="text-xl text-white/50 leading-relaxed">
            Every score you enter fuels a cause. Browse our curated network of global initiatives and decide where your impact lands today.
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
          <Input 
            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20" 
            placeholder="Search causes or impact areas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass-card h-[450px] animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCharities.map((charity, index) => (
            <motion.div
              key={charity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card group flex flex-col overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
                {charity.image_url ? (
                  <img 
                    src={charity.image_url} 
                    alt={charity.name}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-mesh">
                    <Heart className="w-16 h-16 text-white/5" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {charity.is_featured && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Featured Cause
                  </div>
                )}
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-4 h-4 text-primary/40" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Global Impact</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{charity.name}</h3>
                <p className="text-white/40 text-lg leading-relaxed line-clamp-3 mb-10 flex-grow">
                  {charity.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> Verified
                  </div>
                  <Link href={`/charities/${charity.id}`}>
                    <Button variant="glass" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
