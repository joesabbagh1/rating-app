import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-between p-6">
      <h1 className="text-3xl font-bold capitalize">{session?.user?.name}</h1>
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={session ? () => signOut() : () => signIn()}
      >
        {session ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}

export default Header
