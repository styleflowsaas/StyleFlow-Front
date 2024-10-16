import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "StyleFlow",
  description: "FlowApp",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`merriweather-regular antialiased flex flex-row`}>
        {/* Barra de navegación fija */}
        <NavBar />
        {/* Contenido dinámico */}
        <main className="p-1 w-full">{children}</main>

        <Toaster
          position="top-center"
          expand={false}
          richColors
          theme="system"
          closeButton={true}
          pauseWhenPageIsHidden={true}
        />
      </body>
    </html>
  );
}
