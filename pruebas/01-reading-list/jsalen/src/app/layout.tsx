import './globals.css'
import type { Metadata } from 'next'
import { Pangolin } from 'next/font/google'

const inter = Pangolin({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Book Reading List',
  description: 'List of books to read',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
