import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://etyyxegspipinzrbteoi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0eXl4ZWdzcGlwaW56cmJ0ZW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwNDQwNTMsImV4cCI6MTk5NzYyMDA1M30.8w57BCXnvbsypMWRKIeTdSxqzFGWLe0F1CX1NLzMdyM"
);


export default supabase;