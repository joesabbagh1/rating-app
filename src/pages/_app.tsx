import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { trpc } from '../utils/trpc'
import '../styles/globals.css'
import Header from '../components/Header'
import { useRouter } from 'next/router'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      {router.pathname === '/auth/signin' || router.pathname === '/auth/singup' ? (
        <></>
      ) : (
        <Header />
      )}
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
