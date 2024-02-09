import { createClient } from 'https://esm.sh/@supabase/supabase-js';
const supabaseUrl = 'https://limodurjtyztcksbqspy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpbW9kdXJqdHl6dGNrc2Jxc3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MTgyMzMsImV4cCI6MjAyMjA5NDIzM30.xN086TIUrf87882AMnVEXPazv6fV3sfFobBetpKBM_M'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase