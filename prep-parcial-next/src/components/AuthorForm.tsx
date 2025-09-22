"use client";

import { useState } from "react";
import { Author } from "../hooks/useAuthors";

type Props = {
  initial?: Author;
  onSubmit: (a: Author) => Promise<void> | void;
  submitText?: string;
};

export default function AuthorForm({ initial, onSubmit, submitText="Guardar" }: Props) {
  const [form, setForm] = useState<Author>(initial ?? {
    name: "", description: "", image: "", birthDate: ""
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
    <form onSubmit={async e => { e.preventDefault(); await onSubmit(form); }}>
      <div style={{display:"grid", gap:10, maxWidth:520}}>
        <label>Nombre
          <input name="name" value={form.name} onChange={handle} required />
        </label>
        <label>Descripción
          <textarea name="description" value={form.description} onChange={handle} />
        </label>
        <label>Imagen (URL)
          <input name="image" value={form.image} onChange={handle} />
        </label>
        <label>Fecha de nacimiento
          <input type="date" name="birthDate" value={form.birthDate} onChange={handle} />
        </label>
        <button type="submit">{submitText}</button>
      </div>
    </form>
  );

  
}

