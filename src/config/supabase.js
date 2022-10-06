import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xafoutgabswvzahfmsqf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZm91dGdhYnN3dnphaGZtc3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ2MDQxMTksImV4cCI6MTk4MDE4MDExOX0.UehSHcEIQdu4fK29kh1s2fBiLOrn73OwzVIUSBgDRCQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase