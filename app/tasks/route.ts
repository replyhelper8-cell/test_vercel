import { NextResponse } from "next/server";

type Task = {
  id: number;
  text: string;
};

// ⚠️ mémoire serveur (non persistante)
let tasks: Task[] = [];

export async function GET() {
  return NextResponse.json<Task[]>(tasks);
}

export async function POST(req: Request) {
  const body: { text: string } = await req.json();

  const newTask: Task = {
    id: Date.now(),
    text: body.text,
  };

  tasks.push(newTask);

  return NextResponse.json<Task>(newTask);
}

export async function DELETE(req: Request) {
  const body: { id: number } = await req.json();

  tasks = tasks.filter((t) => t.id !== body.id);

  return NextResponse.json({ ok: true });
}