-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Check if the table exists first
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy that allows inserts from anywhere (you can restrict this later)
DROP POLICY IF EXISTS "Allow inserts from anywhere" ON contacts;
CREATE POLICY "Allow inserts from anywhere" 
  ON contacts FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows the service role to select data
DROP POLICY IF EXISTS "Allow service role to select" ON contacts;
CREATE POLICY "Allow service role to select" 
  ON contacts FOR SELECT 
  USING (auth.role() = 'service_role');

SELECT 'Contacts table setup complete' as message;
