import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>Bookstore — Prep Parcial</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
        <Link href="/authors" style={btn("#2563eb")}>Lista de autores</Link>
        <Link href="/crear" style={btn("#16a34a")}>Crear autor</Link>
        <Link href="/favoritos" style={btn("#ca8a04")}>Ver favoritos</Link>
      </div>
    </main>
  );
}

function btn(bg: string): React.CSSProperties {
  return { display:"block", padding:"12px 16px", backgroundColor:bg, color:"#fff", borderRadius:8, textAlign:"center", textDecoration:"none", fontWeight:600 };
}
