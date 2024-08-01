"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <button
        className="bg-slate-500 text-slate-100 p-2 rounded min-w-[100px] animate-pulse"
        disabled={pending}
        type="submit"
      >
        Add
      </button>
    );
  }

  return (
    <button
      className="bg-slate-900 text-slate-100 p-2 rounded min-w-[100px]"
      type="submit"
    >
      Add
    </button>
  );
}
