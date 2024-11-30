import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yvsicrlvnmmozgtslfbe.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2c2ljcmx2bm1tb3pndHNsZmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5Njg5NTIsImV4cCI6MjA0MzU0NDk1Mn0.HLeWu1l7MzpNVmgUYkdRePNpqnKDctW3HWuM7dzeVtE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
