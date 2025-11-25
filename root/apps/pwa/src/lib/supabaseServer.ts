import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Supabase env vars NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are missing");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

