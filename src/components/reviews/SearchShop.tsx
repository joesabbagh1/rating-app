import { useEffect, useRef, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { useRouter } from 'next/router'
import ShopSearched from '../shop/ShopSearched'

const AddReview = () => {
  const [query, setQuery] = useState<string>('')
  const [showRes, setShowRes] = useState<boolean>(false)

  const ref = useRef<HTMLInputElement>(null)

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
    <div className="p-12 px-24">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-4xl font-bold">Search for the place you want to review</div>
        <input
          type="text"
          placeholder="Search here"
          className="mt-6 h-10 w-3/5 rounded-3xl border border-gray-300 p-3 px-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          value={query}
          ref={ref}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => {
            setShowRes(true)
          }}
        />
        <div className="relative w-3/5">
          {showRes &&
            (suggestions?.length ? (
              <div className="absolute z-50 w-full rounded-3xl border-2 border-black bg-white">
                {suggestions?.map((suggestion) => (
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
  )
}

export default AddReview
