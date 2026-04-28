import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

dotenv.config()

const app = express()
const port = process.env.PORT || 10000

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
})

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Aura Golf Backend is Live' })
})

// Prize Draw Logic (Complex computation)
app.post('/api/admin/run-draw', async (req, res) => {
  try {
    const { drawId } = req.body
    
    // 1. Fetch active subscriptions
    const { data: subs } = await supabase
      .from('subscriptions')
      .select('user_id, stripe_customer_id')
      .eq('status', 'active')

    if (!subs || subs.length === 0) {
      return res.status(400).json({ error: 'No active subscribers found' })
    }

    // 2. Select a random winner
    const winner = subs[Math.floor(Math.random() * subs.length)]

    // 3. Update database
    await supabase
      .from('draw_winners')
      .insert({
        draw_id: drawId,
        user_id: winner.user_id,
        prize_amount: 5000, // Example prize
        status: 'pending_verification'
      })

    res.json({ success: true, winner: winner.user_id })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Stripe Webhook (Handle specifically on Render if Vercel has timeout issues)
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle event as needed (same logic as Next.js route but more robust)
  console.log('Received Stripe Event:', event.type)
  
  res.json({ received: true })
})

app.listen(port, () => {
  console.log(`🚀 Aura Golf Backend running at http://localhost:${port}`)
})
