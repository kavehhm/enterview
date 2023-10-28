import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <p className='font-bold'>
      enter
      <span className='text-blue-600'>view</span>
     </p>
    </main>
  )
}
