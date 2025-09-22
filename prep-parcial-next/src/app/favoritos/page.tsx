"use client";

import AuthorList from "../../components/AuthorList";

export default function FavoritosPage() {
  return (
    <main>
      <AuthorList showOnlyFavorites />
    </main>
  );
}
