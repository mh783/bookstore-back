import Link from "next/link";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Bookstore — Prep Parcial
      </h1>

      <Link
        href="/authors"
        style={{
          display: "inline-block",
          padding: "12px 20px",
          backgroundColor: "#2563eb", 

          color: "white",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "500",
          textDecoration: "none",
        }}
      >
        Lista de autores
      </Link>

      <Link
        href="/crear"
        style={{
          display: "inline-block",
          padding: "12px 20px",
          backgroundColor: "#16a34a", 
          color: "white",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "500",
          textDecoration: "none",
        }}
      >
        ➕ Crear autor
      </Link>
    </main>
  );
}
