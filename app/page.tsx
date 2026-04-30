import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";
import TodoDashboard from "./todoDashboard"

export default async function Home() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <TodoDashboard user={user} />;
}