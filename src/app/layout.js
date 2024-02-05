import { Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prep-buddy',
  description: 'Generate Mcq based on your input and asses yourself',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <MainNav/> */}
        {children}
        </body>
    </html>
  )
}
