import { createTodo } from "./actions";
import { SubmitButton } from "./button";
import { db } from "./db";

export default async function Home({
  searchParams,
}: {
  searchParams: { dir?: string };
}) {
  const todos = await db
    .selectFrom("todos")
    .orderBy(searchParams.dir === "asc" ? "id asc" : "id desc")
    .limit(10)
    .selectAll()
    .execute();

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
