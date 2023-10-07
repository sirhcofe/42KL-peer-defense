import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ParentProvider from "@/hooks/dataProvider/ParentProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "42MY Student Management",
  description: "A platform for BOCALs to better manage student at 42MY",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentProvider>{children}</ParentProvider>
      </body>
    </html>
  );
}
