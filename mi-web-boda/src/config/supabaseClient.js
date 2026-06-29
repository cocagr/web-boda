// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gszmcokujsebysuemydc.supabase.co";
const supabaseAnonKey = "sb_publishable_JV4xzNFaXVtsdBsrkmFC7A_aTXp0eAr";

// Chivato de confirmación
console.log("Conectando de forma nativa a Supabase...");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);