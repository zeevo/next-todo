import { sql } from "drizzle-orm";
import { createTodo } from "./actions";
import { db, todosTable } from "./db";
import { SubmitButton } from "./button";

export default async function Home({
  searchParams,
}: {
  searchParams: { asc?: string };
}) {
  const todos = await db
    .select()
    .from(todosTable)
    .limit(10)
    .orderBy(
      searchParams.asc ? sql`${todosTable.id} ASC` : sql`${todosTable.id} DESC`
    );

  return (
    <main className="mt-4 mx-auto max-w-4xl flex flex-col gap-2">
      <h1 className="text-4xl font-bold">TODO</h1>
      <ul className="flex flex-col gap-1 [&>*:nth-child(odd)]:bg-slate-200 rounded">
        {todos.map((todo) => (
          <li key={todo.id} className="p-2">
            {todo.id} {todo.text}
          </li>
        ))}
      </ul>

      <form action={createTodo} className="flex gap-2 justify-end">
        <input
          type="text"
          name="text"
          className="bg-slate-200 rounded p-2"
          autoFocus
          required
        />
        <SubmitButton></SubmitButton>
      </form>
    </main>
  );
}
