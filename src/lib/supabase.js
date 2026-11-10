import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://esnrrobbsdjlvciphiqj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rdrgaSfre0j04m-hu2yC_Q_G2Ki5Bft";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
