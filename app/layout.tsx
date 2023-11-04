import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { currentUserActions } from "@/lib/userActions";
import { Nav } from "@/components/shared/nav";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eve - Event management system for student clubs",
  description: "Event management system for student clubs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
