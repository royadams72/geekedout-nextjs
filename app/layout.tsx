import type { Metadata } from "next";
import Head from "next/head";

import "../globals.scss";
import { StoreProvider } from "./StoreProvider";

import Header from "@/components/header/Header";
import NavigationActions from "@/components/navigation-actions/NavigationActions";

export const metadata: Metadata = {
  title: "Geeked Out",
  description:
    "Discover the ultimate geeked-out web app for all your fandoms! Dive into a world of tech, gaming, comics, and more—customized for your inner geek. Explore, connect, and geek out!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html className="html" lang="en">
        <Head>
          <base href="/" />
        </Head>
        <body className="body">
          <main className="main">
            <StoreProvider>
              <NavigationActions />
              <Header />
              {children}
            </StoreProvider>
          </main>
        </body>
      </html>
    </>
  );
}
