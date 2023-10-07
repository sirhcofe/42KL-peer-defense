import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import ParentProvider from "@/hooks/dataProvider/ParentProvider";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

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
      <body className={rubik.className + " min-h-screen"}>
        <div className="w-full p-6 bg-pink-200">
          <h1>User Role</h1>
        </div>
        <ParentProvider>{children}</ParentProvider>
      </body>
    </html>
  );
}
