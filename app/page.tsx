import { db } from "@/app/db";
import { redirect } from "next/navigation";

async function save(form: FormData) {
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
  const todos = await db
    .selectFrom("todos")
    .selectAll()
    .limit(10)
    .orderBy(searchParams.order === "desc" ? "id desc" : "id asc")
    .execute();

  return (
    <main className="flex min-h-screen flex-col p-2 gap-2">
      <h1 className="text-5xl">Todo</h1>
      <form className="flex gap-2" action={save}>
        <input
          type="text"
          name="text"
          autoFocus
          required
          className="bg-slate-200 rounded p-2 border-slate-400 border"
        />
        <button className="rounded border border-slate-400 p-2 bg-blue-500 text-slate-50">
          Add
        </button>
      </form>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.id} {todo.text}
          </li>
        );
      })}
    </main>
  );
}
