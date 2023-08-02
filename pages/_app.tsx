import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {SessionProvider} from "next-auth/react";

export default function App({session, Component, pageProps}: AppProps) {
  return (
      <SessionProvider session={session}>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </SessionProvider>
  )
}
