// src/app/editar/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthorForm from "../../../components/AuthorForm";
import type { Author } from "../../../hooks/useAuthors";
import { useAuthors } from "../../../hooks/useAuthors";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080").replace(/\/+$/, "");

export default function EditarPage() {
  const { id } = useParams<{ id: string }>();
  const { updateAuthor } = useAuthors();
  const [author, setAuthor] = useState<Author | null>(null);
  const router = useRouter();

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res = await fetch(`${API_BASE}/api/authors/${id}`);
      if (!res.ok) { console.error("GET /api/authors/", id, "→", res.status); return; }
      const data = await res.json();
      if (!ignore) setAuthor(data);
    })();
    return () => { ignore = true; };
  }, [id]);

  if (!author) return <main style={{ padding: 20 }}><p>Cargando…</p></main>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Editar autor</h1>
      <AuthorForm
        initial={author}
        submitText="Guardar cambios"
        onSubmit={async (a) => {
          await updateAuthor(Number(id), a);
          router.push("/authors");
        }}
      />
    </main>
  );
}
