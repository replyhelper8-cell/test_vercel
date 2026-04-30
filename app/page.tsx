import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";
import TodoDashboard from "./todoDashboard"

const supabase = await createClient()

export default async function Home() {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <TodoDashboard user={user} />;
}