import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('score_date', { ascending: false })
    .limit(5)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { score, score_date } = await request.json()

  // Validate range
  if (score < 1 || score > 45) {
    return NextResponse.json({ error: 'Score must be between 1 and 45' }, { status: 400 })
  }

  // Insert - The DB trigger handles the rolling 5 limit
  const { data, error } = await supabase
    .from('scores')
    .insert([{ 
      user_id: user.id, 
      score, 
      score_date 
    }])
    .select()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Duplicate date not allowed' }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data[0])
}
