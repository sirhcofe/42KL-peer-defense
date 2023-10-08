import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import ParentProvider from "@/hooks/dataProvider/ParentProvider";
import { Topbar } from "@/components/layout/Topbar";

const rubik = Jost({ subsets: ["latin"] });

// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST_URL}`;

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
      <ParentProvider>
        <body className={rubik.className + " min-h-screen"}>
          <Topbar />
          <div className="py-6">{children}</div>
        </body>
      </ParentProvider>
    </html>
  );
}
