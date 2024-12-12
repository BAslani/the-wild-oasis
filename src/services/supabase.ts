import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://bshphhapjeykudbfkcwh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaHBoaGFwamV5a3VkYmZrY3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MTk2MzcsImV4cCI6MjA0OTM5NTYzN30.Ow7bfPwhKc8ZPnskxQTFgVdiju3SHKlQmtCTh4OI4lk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
