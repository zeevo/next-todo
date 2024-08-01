"use server";

import { db } from "./db";
import { redirect } from "next/navigation";

export async function createTodo(form: FormData) {
  const formData = form.get("text");

  if (formData) {
    const text = formData.toString();
    await db.insertInto("todos").values({ text }).execute();
  }

  redirect("/");
}
