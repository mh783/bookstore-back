// src/app/crear/page.tsx
"use client";
import { useRouter } from "next/navigation";
import AuthorForm from "../../components/AuthorForm";
import { useAuthors } from "../../hooks/useAuthors";

export default function CrearPage() {
  const { createAuthor, error } = useAuthors();
  const router = useRouter();

  return (
    <main>
      <h1>Crear autor</h1>
      {error && (
        <p style={{ color: "crimson", whiteSpace: "pre-wrap" }}>
          {error}
        </p>
      )}
      <AuthorForm
        submitText="Crear"
        onSubmit={async (a) => {
          try {
            await createAuthor(a);
            router.push("/authors");
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </main>
  );
}
