import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamed Ejbari | Health & Tech",
  description: "A blend of health and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <nav className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
             <span className="font-bold tracking-tighter">HAMED EJBARI</span>
             <div className="space-x-6 text-sm">
                <a href="/" className="hover:text-gray-500">Home</a>
                <a href="/about" className="hover:text-gray-500">About</a>
                <a href="/projects" className="hover:text-gray-500">Projects</a>
                <a href="/contact" className="hover:text-gray-500">Contact</a>
             </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-6 flex-grow w-full">
          {children}
        </main>
      </body>
    </html>
  );
}

