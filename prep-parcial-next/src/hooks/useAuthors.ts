"use client";

import { useEffect, useState } from "react";

export type Author = {
  id?: number;
  name: string;
  description: string;
  image: string;
  birthDate: string; 
};


const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080").replace(/\/+$/, "");
const apiFetch = (path: string, init?: RequestInit) =>
  fetch(`${API_BASE}${path.startsWith("/") ? path : `/${path}`}`, init);

if (typeof window !== "undefined") {
  console.log("API base =", API_BASE);
}

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch("/api/authors");
      if (!res.ok) throw new Error(`GET /api/authors → ${res.status}`);
      const data = await res.json();
      setAuthors(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al cargar autores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const createAuthor = async (a: Author) => {
    const res = await apiFetch("/api/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(a),
    });

    if (!res.ok) {
      let detail = "";
      try {
        const ct = res.headers.get("content-type") || "";
        detail = ct.includes("application/json") ? JSON.stringify(await res.json()) : await res.text();
      } catch {
        detail = "<sin cuerpo>";
      }
      setError(`POST /api/authors → ${res.status}. Respuesta: ${detail}`);
      throw new Error(`POST /api/authors → ${res.status}`);
    }

    await fetchAuthors();
  };

  const updateAuthor = async (id: number, a: Author) => {
    const res = await apiFetch(`/api/authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(a),
    });
    if (!res.ok) {
      setError(`PUT /api/authors/${id} → ${res.status}`);
      throw new Error(`PUT /api/authors/${id} → ${res.status}`);
    }
    await fetchAuthors();
  };

  
  const deleteAuthor = async (id: number) => {
    const res = await apiFetch(`/api/authors/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError(`DELETE /api/authors/${id} → ${res.status}`);
      throw new Error(`DELETE /api/authors/${id} → ${res.status}`);
    }
    setAuthors(prev => prev.filter(a => a.id !== id));
  };

  return { authors, loading, error, fetchAuthors, createAuthor, updateAuthor, deleteAuthor };
}
