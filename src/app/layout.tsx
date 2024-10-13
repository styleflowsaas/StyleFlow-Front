import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "@/components/NavBar/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StyleFlow",
  description: "FlowApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid`}
      >
        <div className="grid grid-cols-[auto_1fr] min-h-screen text-[1em]">
          {/* Barra de navegación fija */}
          <NavBar />

          {/* Contenido dinámico */}
          <main className="p-1">{children}</main>
        </div>
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
