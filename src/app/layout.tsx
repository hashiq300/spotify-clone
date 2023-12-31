import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import SessionProvider from '@/providers/SessionProvider'
import { getServersideSession } from '@/lib/auth'
import ToasterProvider from '@/providers/ToasterProvider'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import QueryClientProvider from '@/providers/QueryClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServersideSession();
  return (
    <html lang="en">
      <body className={inter.className + " bg-black text-white"}>
        <QueryClientProvider>
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ToasterProvider />
        <SessionProvider session={session}>
          <ModalProvider />
          <Sidebar>
            {children}
          </Sidebar>
        </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
