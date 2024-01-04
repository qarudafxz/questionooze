import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/global'

const supabase = createClient<Database>(
	import.meta.env.SUPABASE_URL as string,
	import.meta.env.SUPABASE_ANON_KEY as string
)

export default supabase
