import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://wpxkzszxrqdfcnegndtt.supabase.co'
const supabaseKey = "sb_publishable_s1nNULAdHuE1f0U4WMdUTg_h5lPmpAE";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;