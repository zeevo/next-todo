"use server";

import { db, todosTable } from "./db";
import { redirect } from "next/navigation";

export async function createTodo(form: FormData) {
  const formData = form.get("text");

  if (formData) {
    const text = formData.toString();
    await db.insert(todosTable).values({ text });
  }

  redirect("/");
}
