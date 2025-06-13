import "gpdesign/dist/index.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

import WrapperLayout from "@/components/utilsComponents/WrapperLayout";

const RalewayFont = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GP Recipe Finder",
  description: "Discover delicious recipes from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RalewayFont.variable}`}>
        <WrapperLayout>{children}</WrapperLayout>
      </body>
    </html>
  );
}
