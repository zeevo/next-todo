import Image from "next/image";
import { db } from "./db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function saveTodo(form: FormData) {
  "use server";

  const formData = form.get("text");

  if (formData) {
    const text = formData.toString();
    await db.insertInto("todos").values({ text }).execute();
  }

  redirect("/");
}

export default async function Home({
  searchParams,
}: {
  searchParams: { order: string };
}) {
  let query = db.selectFrom("todos").selectAll().limit(100);

  query = query.orderBy(searchParams.order === "asc" ? "id asc" : "id desc");

  const todos = await query.execute();
  return (
    <main className="flex min-h-screen flex-col p-2">
      <Link href={"/customers"}>Customers</Link>
      <h1 className="text-4xl pb-2">Todo app</h1>
      <form action={saveTodo} className="flex gap-2">
        <input
          type="text"
          name="text"
          autoFocus
          required
          className="bg-slate-200 rounded p-2 border border-slate-400"
        />
        <button className="rounded border border-slate-400 p-2 bg-blue-600 text-slate-50">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id} {todo.text}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
