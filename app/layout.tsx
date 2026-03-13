import type { Metadata } from "next";
import { DM_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NCCF MD Dashboard — Key Performance Indicators",
  description: "National Cooperative Consumers' Federation — Managing Director's KPI Dashboard for Procurement, Disposal, Inventory, Market Intelligence, and Financial Analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sourceSans.variable}`}>
        <Sidebar />
        <div className="page-content">
          {children}
        </div>
      </body>
    </html>
  );
}
