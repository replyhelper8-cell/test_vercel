"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");

  const loadTasks = async () => {
    const res = await fetch("/api/tasks");
    const data: Task[] = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const newTask: Task = await res.json();

    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const removeTask = async (id: number) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Todo App (TSX + API memory ⚠️)</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}