import type { Metadata } from "next";
import Head from "next/head";
import { cookies } from "next/headers";

import "./globals.scss";
import { StoreProvider } from "./StoreProvider";
import { getSessionData } from "@/lib/redis/redis";

import Header from "@/shared/components/header/Header";
import NavigationActions from "@/shared/components/navigation-actions/NavigationActions";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");

  const preloadedState =
    (await getSessionData(sessionId?.value as string)) || undefined;
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
