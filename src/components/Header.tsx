import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { faPenToSquare, faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
import ShopSearched from './shop/ShopSearched'

const Header = () => {
  const { data: session } = useSession()
  const [query, setQuery] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [showRes, setShowRes] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowRes(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const { data: suggestions, isFetchedAfterMount } = trpc.shops.getByName.useQuery(query, {
    enabled: !!query,
  })

  const router = useRouter()

  function redirectShop(shopId: string) {
    router.push(`/review/add/${shopId}`)
  }

  useEffect(() => {
    if (query) {
      setShowRes(true)
    } else {
      setShowRes(false)
    }
  }, [query])

  return (
    <nav className="flex items-start justify-between p-6 px-24">
      <div className="flex items-start">
        <Link href="/home" className="mr-6 text-4xl font-bold capitalize">
          Rated
        </Link>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Search place"
            className="h-10 w-80 rounded-3xl border border-gray-300 p-3 px-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => {
              setShowRes(true)
            }}
          />
          <div className="relative">
            {showRes &&
              (suggestions?.length ? (
                <div className="absolute z-50 w-full rounded-3xl border-2 border-black bg-white">
                  {suggestions?.map((suggestion, index) => (
                    <ShopSearched shop={suggestion} setShowRes={setShowRes} key={suggestion.id} />
                  ))}
                </div>
              ) : (
                isFetchedAfterMount && (
                  <div className="absolute z-50 w-full rounded-3xl border-2 border-black bg-white p-4 font-semibold">
                    No results found
                  </div>
                )
              ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Link href="/review/add">
          <div className="flex items-center">
            <FontAwesomeIcon size="xl" icon={faPenToSquare} />
            <span className="ml-2 text-2xl font-semibold">Review</span>
          </div>
        </Link>
        <Link href="/shop/add">
          <div className="flex items-center">
            <FontAwesomeIcon size="xl" icon={faSquarePlus} />
            <span className="ml-2 text-2xl font-semibold">Place</span>
          </div>
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
          <button onClick={() => router.push('/auth/signin')}>
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
