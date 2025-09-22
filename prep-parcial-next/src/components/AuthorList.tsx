"use client";

import Link from "next/link";
import { useAuthors } from "../hooks/useAuthors";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

type Props = { showOnlyFavorites?: boolean };

export default function AuthorList({ showOnlyFavorites }: Props) {
  const { authors, loading, error, deleteAuthor } = useAuthors();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  const searched = authors.filter(a =>
    [a.name, a.description].some(t => t?.toLowerCase().includes(q.toLowerCase()))
  );
  const filtered = showOnlyFavorites
    ? searched.filter(a => isFavorite(a.id))
    : searched;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{showOnlyFavorites ? "Favoritos" : "Autores"}</h1>
        {!showOnlyFavorites && (
          <Link href="/crear" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500">
            <span>＋</span> Crear autor
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar autor…"
          aria-label="Buscar autor"
          className="w-72 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus:border-neutral-600 focus:outline-none"
        />
        {loading && <span className="text-sm text-neutral-400" role="status" aria-live="polite">Cargando…</span>}
        {error && <span className="text-sm text-red-400" role="alert">{error}</span>}
      </div>

      <ul className="space-y-3">
        {filtered.map((a) => {
          const img =
            a.image && /^https?:\/\//i.test(a.image)
              ? a.image
              : "https://via.placeholder.com/56?text=%3F";
          const born = a.birthDate ? new Date(a.birthDate).toLocaleDateString("es-CO") : "—";
          const fav = isFavorite(a.id);

          return (
            <li key={a.id} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3">
              <div className="flex items-start gap-3">
                <img
                  src={img}
                  alt={`Foto de ${a.name}`}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-lg object-cover ring-1 ring-neutral-800"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <strong>{a.name}</strong>
                    {fav && <span aria-hidden="true" title="Autor en favoritos">⭐</span>}
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2">{a.description}</p>
                  <div className="mt-1 text-xs text-neutral-500">Nació: {born}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(a.id)}
                    aria-label={fav ? `Quitar ${a.name} de favoritos` : `Agregar ${a.name} a favoritos`}
                    aria-pressed={fav}
                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                      fav
                        ? "border-yellow-700 bg-yellow-900/40 text-yellow-200 hover:bg-yellow-900/60"
                        : "border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                    }`}
                    title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    {fav ? "★ Favorito" : "☆ Favorito"}
                  </button>

                  {!showOnlyFavorites && (
                    <Link
                      href={`/editar/${a.id}`}
                      aria-label={`Editar ${a.name}`}
                      className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-700"
                    >
                      ✏️ Editar
                    </Link>
                  )}

                  {!showOnlyFavorites && (
                    <button
                      type="button"
                      aria-label={`Eliminar ${a.name}`}
                      disabled={!a.id || busyId === a.id}
                      onClick={async () => {
                        if (!a.id) return;
                        if (!confirm(`¿Eliminar a "${a.name}"?`)) return;
                        try { setBusyId(a.id); await deleteAuthor(a.id); }
                        finally { setBusyId(null); }
                      }}
                      className="rounded-lg border border-red-800 bg-red-900/40 px-3 py-1.5 text-sm text-red-300 hover:bg-red-900/60 disabled:opacity-60"
                    >
                      🗑️ Eliminar
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!loading && filtered.length === 0 && (
        <p className="text-sm text-neutral-400">No hay autores {showOnlyFavorites ? "en favoritos" : ""}.</p>
      )}
    </section>
  );
}
