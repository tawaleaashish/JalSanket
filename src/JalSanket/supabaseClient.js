import { createClient } from 'https://esm.sh/@supabase/supabase-js';
const supabaseUrl = 'https://jteiiibyahylswlrkdaw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZWlpaWJ5YWh5bHN3bHJrZGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NTcxMDgsImV4cCI6MjA1MDQzMzEwOH0.Kd5oMuoeeapuaA4osQMuVIKr2R2QCVlm9YTqeFG6Wvc'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase