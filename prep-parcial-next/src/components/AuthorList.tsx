"use client";

import Link from "next/link";
import { useAuthors } from "../hooks/useAuthors";

export default function AuthorList() {
  const { authors, loading, error, deleteAuthor } = useAuthors();

  if (loading) return <p>Cargando…</p>;
  if (error) return <p style={{color:"crimson"}}>Error: {error}</p>;

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1>Autores</h1>
        <Link href="/crear">➕ Crear autor</Link>
      </div>

      {authors.length === 0 && <p>No hay autores.</p>}

      <ul style={{display:"grid", gap:12, padding:0, listStyle:"none"}}>
        {authors.map(a => (
          <li key={a.id} style={{border:"1px solid #eee", borderRadius:8, padding:12}}>
            <div style={{display:"flex", gap:12, alignItems:"center"}}>
              {/* Imagen simple */}
              {!!a.image && <img src={a.image} alt={a.name} width={56} height={56} style={{objectFit:"cover", borderRadius:8}}/>}
              <div style={{flex:1}}>
                <strong>{a.name}</strong>
                <div style={{fontSize:14, color:"#555"}}>{a.description}</div>
                <div style={{fontSize:12, color:"#777"}}>Nació: {a.birthDate}</div>
              </div>
              <div style={{display:"flex", gap:8}}>
                <Link href={`/editar/${a.id}`}>✏️ Editar</Link>
                <button onClick={() => a.id && deleteAuthor(a.id)} style={{color:"crimson"}}>🗑️ Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
