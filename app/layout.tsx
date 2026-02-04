import "./globals.css";
import { NextAuthProvider } from "../providers";

export const metadata = {
  title: "Marketing Hub Confi",
  description: "Gestão Neo-Brutalista de Agenda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* o visual do mock vem do globals.css (bg branco + Causten + traço grosso) */}
      <body className="font-causten antialiased text-black bg-white overflow-x-hidden">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
