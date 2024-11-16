import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "字母游戏 & 键盘练习",
  description: "Interactive alphabet matching game and keyboard training for children",
  keywords: "alphabet game, keyboard training, educational game, children education",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#4F46E5",
  openGraph: {
    title: "字母游戏 & 键盘练习",
    description: "Interactive alphabet matching game and keyboard training for children",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100`}
      >
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <a 
                  href="/" 
                  className="text-lg font-medium hover:text-indigo-200 transition-colors"
                >
                  字母游戏
                </a>
                <a 
                  href="/typing" 
                  className="text-lg font-medium hover:text-indigo-200 transition-colors"
                >
                  键盘练习
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
