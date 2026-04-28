'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <p className="text-white/60 mb-8">
            We've sent a confirmation link to <strong>{email}</strong>. Please verify your account to continue.
          </p>
          <Link href="/login">
            <Button className="w-full">Back to Login</Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 max-w-md w-full"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Create Account</h2>
          <p className="text-white/50">Join the elite golf community</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-white/40">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:text-primary transition-colors font-medium">
            Log In
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
