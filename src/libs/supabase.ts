import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/global'

const supabase = createClient<Database>(
	'https://mribsngufluuvvgltfpj.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaWJzbmd1Zmx1dXZ2Z2x0ZnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODA0OTUsImV4cCI6MjAxOTk1NjQ5NX0.hzra-a9In1ARwXtc703-zzlaxKNuKEwKM85HrGXyX5U'
)

export default supabase
