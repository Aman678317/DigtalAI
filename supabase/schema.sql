-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  country TEXT,
  selected_charity_id UUID,
  charity_percentage INTEGER DEFAULT 10,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create charities table
CREATE TABLE charities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  events JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create scores table
CREATE TABLE scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 45),
  score_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, score_date)
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_type TEXT CHECK (plan_type IN ('monthly', 'yearly')),
  status TEXT,
  renewal_date TIMESTAMP WITH TIME ZONE,
  amount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create draws table
CREATE TABLE draws (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  logic_type TEXT DEFAULT 'random' CHECK (logic_type IN ('random', 'algorithmic')),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published')),
  draw_numbers INTEGER[],
  prize_pool_total INTEGER DEFAULT 0,
  jackpot_rollover_amount INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create winners table
CREATE TABLE winners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  draw_id UUID REFERENCES draws ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  match_type INTEGER CHECK (match_type IN (3, 4, 5)),
  prize_amount INTEGER,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create winner_proofs table
CREATE TABLE winner_proofs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  winner_id UUID REFERENCES winners ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add foreign key for charity to profiles
ALTER TABLE profiles ADD CONSTRAINT profiles_selected_charity_id_fkey FOREIGN KEY (selected_charity_id) REFERENCES charities(id);

-- RLS Policies (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE charities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Charities are viewable by everyone" ON charities FOR SELECT USING (true);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own scores" ON scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scores" ON scores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scores" ON scores FOR DELETE USING (auth.uid() = user_id);

-- Functions and Triggers for rolling scores (limit to 5)
CREATE OR REPLACE FUNCTION handle_score_rolling()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user already has 5 scores
  IF (SELECT count(*) FROM scores WHERE user_id = NEW.user_id) >= 5 THEN
    -- Delete the oldest score
    DELETE FROM scores
    WHERE id = (
      SELECT id FROM scores
      WHERE user_id = NEW.user_id
      ORDER BY score_date ASC, created_at ASC
      LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER score_rolling_trigger
BEFORE INSERT ON scores
FOR EACH ROW EXECUTE FUNCTION handle_score_rolling();
