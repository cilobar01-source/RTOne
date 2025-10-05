
// Global Supabase + Auth helpers
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getSessionProfile(){
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return null;
  const { data: prof } = await sb.from("profiles").select("role,email").eq("id", session.user.id).single();
  return { session, role: prof?.role || "WARGA", email: session.user.email };
}
export async function requireRole(allowed){
  const prof = await getSessionProfile();
  if (!prof){ window.location.href = "login.html"; return null; }
  if (!allowed.includes(prof.role)){
    const map = { RT:"dashboard-rt.html", PKK:"dashboard-pkk.html", Karang:"dashboard-karang.html", WARGA:"warga.html" };
    window.location.href = map[prof.role] || "index.html"; return null;
  }
  return prof;
}
export function setupLogout(btnId="logoutBtn"){
  const el = document.getElementById(btnId);
  if (!el) return;
  el.addEventListener("click", async ()=>{
    await sb.auth.signOut();
    window.location.href = "login.html";
  });
}
