import { Inter } from 'next/font/google'
import Navbar from './ui/navbar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body >
        <Navbar/> {children}
        </body>
    </html>
  )
}
