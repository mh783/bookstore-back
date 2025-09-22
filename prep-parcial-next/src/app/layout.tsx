import "./globals.css";
import Providers from "../components/Providers";

export const metadata = { title: "Prep Parcial Next.js" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{fontFamily:"system-ui", padding:20, maxWidth:960, margin:"0 auto"}}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
