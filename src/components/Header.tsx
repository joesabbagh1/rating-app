import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { faPenToSquare, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, RefObject, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])

  return (
    <nav className="flex items-center justify-between p-6 px-24">
      <div className="flex items-start">
        <Link href="/home" className="text-4xl font-bold capitalize">
          Rated
        </Link>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input mx-4 h-10 w-80 max-w-md rounded-3xl"
        />
      </div>
      <div className="flex items-center gap-10">
        <Link href="/review/add">
          <FontAwesomeIcon size="xl" icon={faPenToSquare} />
          <span className="ml-2 text-xl font-semibold">Review</span>
        </Link>
        <Link href="/profile">
          <FontAwesomeIcon size="xl" icon={faHeart} />
          <span className="ml-2 text-xl font-semibold">Places</span>
        </Link>

        {session ? (
          <div
            ref={ref}
            className="cursor-pointer text-3xl font-bold capitalize"
            onClick={() => {
              setOpen(!open)
            }}
          >
            {session?.user?.name}
          </div>
        ) : (
          <button onClick={() => signIn()}>
            <span className="text-xl font-semibold">Sign in</span>
          </button>
        )}
        {open && (
          <ul className="menu menu-compact absolute right-8 top-14 mt-4 w-52 rounded-xl p-1 shadow-md">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <button
                className="rounded-full font-semibold no-underline transition"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Header
