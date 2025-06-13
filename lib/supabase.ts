import { createClient } from "@supabase/supabase-js"

// Get the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables. Please check your .env.local file.")
}

// Create a single supabase client for server-side operations
export const supabaseServer = createClient(supabaseUrl || "", supabaseServiceKey || "", {
  auth: {
    persistSession: false,
  },
})

// Export a function to check if Supabase is configured correctly
export const checkSupabaseConnection = async () => {
  try {
    // Try a simple query to check connection
    const { data, error } = await supabaseServer.from("contacts").select("count").limit(1)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error checking Supabase connection" }
  }
}
