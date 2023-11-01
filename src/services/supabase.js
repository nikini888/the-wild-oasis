import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://mthuvtxnygtzbgwjvqop.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10aHV2dHhueWd0emJnd2p2cW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMzUxNTgsImV4cCI6MjAxMTgxMTE1OH0.fdWHhhBqFEGmmJ5jjAFnfZeJMYeKH8xqfk5kOfTmcPA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
