'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from './ui/Button'
import { useState, useEffect } from 'react'

export const Navbar = () => {
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  )
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(20px)']
  )

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 transition-all"
    >
      <Link href="/" className="text-xl font-semibold tracking-tight text-white">
        AURA<span className="text-primary">GOLF</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <Link href="/charities" className="hover:text-white transition-colors">Charities</Link>
        <Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="glass" size="sm">Log In</Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </motion.nav>
  )
}
