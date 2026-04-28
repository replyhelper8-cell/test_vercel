"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";


type Task = {
  id: string;
  task_name: string;
  created_at: string;
  user_id: string;
};

export default async function Home() {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const loadTasks = async (): Promise<void> => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTasks(data);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (): Promise<void> => {
    if (!input.trim()) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ task_name: input, user_id: user.id })
      .select()
      .single();

    if (!error && data) {
      setTasks((prev) => [data, ...prev]);
      setInput("");
    }
  };

  const removeTask = async (id: string): Promise<void> => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Todo App (Supabase + UUID ✅)</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.task_name}
            <button onClick={() => removeTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}