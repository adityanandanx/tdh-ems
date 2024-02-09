import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/shared/nav/Nav";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/shared/footer";
import { HideOnPaths } from "@/components/specific/hide-on-paths";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TDH - The Designnovation Hub",
  description:
    "Innovation and impact through design thinking, software development and research.",
  keywords: ["events", "clubs", "graphic era", "tdh", "innovation", "design"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div
          className="fixed inset-0 pointer-events-none"
          aria-hidden
          id="visible-area"
        ></div>
        <Provider>
          <Nav />
          <div className="min-h-[80vh]">{children}</div>
          <HideOnPaths paths={["/events"]}>
            <Footer />
          </HideOnPaths>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
