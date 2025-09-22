"use client";

import { useRef, useState } from "react";
import { Author } from "../hooks/useAuthors";

type Props = {
  initial?: Author;
  onSubmit: (a: Author) => Promise<void> | void;
  submitText?: string;
};

export default function AuthorForm({
  initial,
  onSubmit,
  submitText = "Guardar",
}: Props) {
  const [form, setForm] = useState<Author>(
    initial ?? { name: "", description: "", image: "", birthDate: "" }
  );

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  //Validaciones 
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const rules = {
    name: (v: string) => v.trim().length > 0,
    description: (v: string) => v.trim().length > 0,
    image: (v: string) => /^https?:\/\/.+/.test(v.trim()),
    birthDate: (v: string) => !!v && v <= today, // no puede ser futura
  };

  const invalid = {
    name: touched.name && !rules.name(form.name),
    description: touched.description && !rules.description(form.description),
    image: touched.image && !rules.image(form.image),
    birthDate: touched.birthDate && !rules.birthDate(form.birthDate),
  };

  const formIsValid =
    rules.name(form.name) &&
    rules.description(form.description) &&
    rules.image(form.image) &&
    rules.birthDate(form.birthDate);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formIsValid) {
      setTouched({ name: true, description: true, image: true, birthDate: true });

      if (!rules.name(form.name)) {
        nameRef.current?.focus();
        return;
      }
      if (!rules.description(form.description)) {
        descRef.current?.focus();
        return;
      }
      if (!rules.image(form.image)) {
        imageRef.current?.focus();
        return;
      }
      if (!rules.birthDate(form.birthDate)) {
        dateRef.current?.focus();
        return;
      }
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} aria-describedby="form-help">
      <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        {/* Nombre */}
        <label style={{ display: "grid", gap: 4 }}>
          <span>Nombre</span>
          <input
            ref={nameRef}
            name="name"
            value={form.name}
            onChange={handle}
            onBlur={() => setTouched((s) => ({ ...s, name: true }))}
            required
            aria-required="true"
            aria-invalid={invalid.name || undefined}
            aria-describedby="help-name"
          />
          <small id="help-name" style={{ color: "#888" }}>
            Obligatorio.
          </small>
          {invalid.name && (
            <span role="alert" style={{ color: "crimson" }}>
              Ingresa un nombre.
            </span>
          )}
        </label>

        {/* Descripción */}
        <label style={{ display: "grid", gap: 4 }}>
          <span>Descripción</span>
          <textarea
            ref={descRef}
            name="description"
            value={form.description}
            onChange={handle}
            onBlur={() => setTouched((s) => ({ ...s, description: true }))}
            required
            aria-required="true"
            aria-invalid={invalid.description || undefined}
            aria-describedby="help-description"
          />
          <small id="help-description" style={{ color: "#888" }}>
            Obligatoria. Describe brevemente al autor.
          </small>
          {invalid.description && (
            <span role="alert" style={{ color: "crimson" }}>
              La descripción es obligatoria.
            </span>
          )}
        </label>

        {/* Imagen */}
        <label style={{ display: "grid", gap: 4 }}>
          <span>Imagen (URL)</span>
          <input
            ref={imageRef}
            name="image"
            value={form.image}
            onChange={handle}
            onBlur={() => setTouched((s) => ({ ...s, image: true }))}
            required
            aria-required="true"
            aria-invalid={invalid.image || undefined}
            aria-describedby="help-image"
            pattern="https?://.+"
            placeholder="https://…"
            inputMode="url"
          />
          <small id="help-image" style={{ color: "#888" }}>
            Debe iniciar con http(s)://
          </small>
          {invalid.image && (
            <span role="alert" style={{ color: "crimson" }}>
              Ingresa una URL válida que empiece con http(s)://
            </span>
          )}
        </label>

        {/* Fecha de nacimiento */}
        <label style={{ display: "grid", gap: 4 }}>
          <span>Fecha de nacimiento</span>
          <input
            ref={dateRef}
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handle}
            onBlur={() => setTouched((s) => ({ ...s, birthDate: true }))}
            required
            aria-required="true"
            aria-invalid={invalid.birthDate || undefined}
            aria-describedby="help-birth"
            max={today}
          />
          <small id="help-birth" style={{ color: "#888" }}>
            No puede ser una fecha futura.
          </small>
          {invalid.birthDate && (
            <span role="alert" style={{ color: "crimson" }}>
              Selecciona una fecha válida (no futura).
            </span>
          )}
        </label>

        {}
        <button
          type="submit"
          disabled={!formIsValid}
          aria-disabled={!formIsValid}
          className="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #444",
            background: formIsValid ? "#2563eb" : "#404040",
            color: "white",
            cursor: formIsValid ? "pointer" : "not-allowed",
          }}
        >
          {submitText}
        </button>

        <small id="form-help" style={{ color: "#888" }}>
          Los campos marcados como obligatorios deben estar completos para habilitar el envío.
        </small>
      </div>
    </form>
  );
}
