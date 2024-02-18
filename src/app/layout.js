import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prep-buddy',
  description: 'Generate Mcq based on your input and asses yourself',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
        <Toaster />
    </html>
  )
}
