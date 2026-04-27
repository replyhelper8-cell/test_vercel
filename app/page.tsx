"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [...prev, input]);
    setInput("");
  };

  const removeTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="container">
      <h1>🚀 My Simple Next App (TSX)</h1>

      <div className="card">
        <h2>Todo List</h2>

        <div className="row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => removeTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
