import { createClient } from "./supabase/client";

export async function getAllItems(){
    const supabase = await createClient();
    return await supabase.from("items").select();
}