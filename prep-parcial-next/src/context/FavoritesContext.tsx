"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type FavoritesCtx = {
  favorites: Set<number>;
  isFavorite: (id?: number) => boolean;
  toggleFavorite: (id?: number) => void;
};

const Ctx = createContext<FavoritesCtx | null>(null);
const STORAGE_KEY = "bookstore:favorites:v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [fav, setFav] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFav(new Set(JSON.parse(raw) as number[]));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(fav)));
    } catch {}
  }, [fav]);

  const value = useMemo<FavoritesCtx>(() => ({
    favorites: fav,
    isFavorite: (id) => (typeof id === "number" ? fav.has(id) : false),
    toggleFavorite: (id) => {
      if (typeof id !== "number") return;
      setFav(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    },
  }), [fav]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
