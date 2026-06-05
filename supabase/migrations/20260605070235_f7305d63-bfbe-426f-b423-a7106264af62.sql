
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  customer_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notes" ON public.notes FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.sent_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  customer_id TEXT NOT NULL,
  match_profile_id TEXT NOT NULL,
  intro_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, customer_id, match_profile_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sent_matches TO authenticated;
GRANT ALL ON public.sent_matches TO service_role;
ALTER TABLE public.sent_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own sent matches" ON public.sent_matches FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
