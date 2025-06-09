import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EmotiMate',
  description: 'Twój czat emocjonalny'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
