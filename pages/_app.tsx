import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Poppins} from '@next/font/google'
import { SessionProvider } from 'next-auth/react'

const poppins = Poppins({subsets : ['latin'], weight : ['300', '400', '500', '700', '800'], fallback : ['sans-serif', 'system-ui']})



export default function App({ Component, pageProps : {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main dir="ltr" className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
