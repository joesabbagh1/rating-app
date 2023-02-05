import { Review, Shop } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { trpc } from '../../utils/trpc'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pic from '../images/pic.jpeg'
import clsx from 'clsx'
import Image from 'next/image'

const AddReview = () => {
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Shop[] | null>()
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

  const { refetch } = trpc.shops.getByName.useQuery(query, { enabled: false })

  useEffect(() => {
    if (!query) {
      setSuggestions(null)
    }
    const getData = setTimeout(async () => {
      if (query) {
        const { data } = await refetch()
        setSuggestions(data)
      }
    }, 500)
    return () => clearTimeout(getData)
  }, [query])

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
        <div
          ref={ref}
          className={clsx('mx-96 flex w-1/2 flex-col items-center rounded-lg pt-6 pb-3', {
            'bg-cyan-100': showRes && suggestions,
          })}
        >
          <div className="w-full px-6">
            <input
              type="text"
              placeholder="Search here"
              className="mb-3 h-10 w-full rounded-3xl border py-3 px-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={() => {
                setShowRes(true)
              }}
            />
          </div>
          {showRes && (
            <div className="w-full">
              {suggestions?.map((suggestion) => (
                <div
                  className="cursor-pointer px-6 py-3 transition duration-200 ease-in-out hover:bg-black hover:bg-opacity-5"
                  onClick={() => {
                    setShowRes(false), setQuery(suggestion.title), redirectShop(suggestion.id)
                  }}
                >
                  <div className="flex items-center gap-1" key={suggestion.id}>
                    <Image
                      src={pic}
                      alt=""
                      className="z-50 h-14 w-14 rounded-lg object-cover object-center"
                    />
                    <div>
                      <div className="text-sm font-bold">{suggestion.title}</div>
                      <div className="text-sm font-light">
                        {suggestion.city}, {suggestion.street}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddReview
