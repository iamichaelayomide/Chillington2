const requiredPublicEnv = ["NEXT_PUBLIC_WHATSAPP_NUMBER"] as const;

function isPlaceholder(value?: string) {
  if (!value) {
    return true;
  }

  return value.startsWith("your_");
}

export function getPublicEnv() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2347032891651",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };
}

export function isSupabaseConfigured() {
  const env = getPublicEnv();
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && !isPlaceholder(env.supabaseUrl) && !isPlaceholder(env.supabaseAnonKey));
}

export function isSupabaseAdminConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !isPlaceholder(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !isPlaceholder(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
      !isPlaceholder(process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}

export function assertPublicEnv() {
  const missing = requiredPublicEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing public environment variables: ${missing.join(", ")}`);
  }
}
