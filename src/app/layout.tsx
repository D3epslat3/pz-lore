import type React from "react"
import "./globals.css"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "S.O.L.A.R.A Terminal",
  description: "Sistema de Acesso a Arquivos Confidenciais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="bg-black">
        
          {children}
        
      </body>
    </html>
  )
}
