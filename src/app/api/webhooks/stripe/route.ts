import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = (await headers()).get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = await createClient()

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      
      // Map Stripe customer to Supabase user
      // In a real app, you'd store stripe_customer_id in the profiles table
      const { data: profile } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (profile) {
        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            renewal_date: new Date(subscription.current_period_end * 1000).toISOString(),
            stripe_subscription_id: subscription.id,
            amount: subscription.items.data[0].plan.amount,
          })
          .eq('user_id', profile.user_id)
      }
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
