import { createClient } from "@supabase/supabase-js"

// Create a function to get the Supabase client
// This ensures we only create the client when the environment variables are available
export function getSupabaseServer() {
  // Get the environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Check if environment variables are set
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables. Please check your .env.local file.")
    // Return a dummy client that will throw clear errors if used
    return {
      from: () => {
        throw new Error("Supabase client not properly initialized. Check your environment variables.")
      },
    } as any
  }

  // Create a supabase client for server-side operations
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Export a function to check if Supabase is configured correctly
export async function checkSupabaseConnection() {
  try {
    const supabase = getSupabaseServer()

    // Try a simple query to check connection
    const { data, error } = await supabase.from("contacts").select("count").limit(1)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error checking Supabase connection" }
  }
}
