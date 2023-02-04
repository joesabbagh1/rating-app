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
  const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    price: yup.string().required('Required'),
    rating: yup.string(),
  })

  const session = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Review>({
    resolver: yupResolver(validationSchema),
  })

  //trpc create a review
  // const mutation = trpc.reviews.useMutation()

  // async function handleCreation(data: any) {
  //   await mutation.mutateAsync(data)
  //   router.push('/home', undefined, { shallow: false })
  // }

  const onSubmit: SubmitHandler<Review> = async (data) => {
    console.log(data)
    // handleCreation(data)
  }

  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Shop[] | null>()
  const [showRes, setShowRes] = useState<boolean>(false)
  const [selectedShop, setSelectedShop] = useState<Shop>()

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

  const { error, data, refetch } = trpc.shops.getByName.useQuery(query, { enabled: false })

  useEffect(() => {
    if (!query) {
      setSuggestions(null)
    }
    const getData = setTimeout(() => {
      if (query) {
        refetch()
        setSuggestions(data)
      }
    }, 500)
    return () => clearTimeout(getData)
  }, [query])

  return (
    <div className="p-12 px-24">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="mb-12 text-4xl font-bold">Search for the place you want to review</div>
        <div
          ref={ref}
          className={clsx('mx-96 flex w-1/2 flex-col items-center p-6', {
            'bg-slate-400': showRes && suggestions,
          })}
        >
          <input
            type="text"
            placeholder="Search here"
            className="h-10 w-full rounded-3xl border py-3 px-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => {
              setShowRes(true)
            }}
          />
          {query && showRes && (
            <div className="w-full">
              {suggestions?.map((suggestion) => (
                <div
                  className="hover:bg-white"
                  onClick={() => {
                    setSelectedShop(suggestion), setShowRes(false), setQuery(suggestion.title)
                  }}
                >
                  <div className="divider my-0"></div>
                  <div className="flex items-center gap-1" key={suggestion.id}>
                    <Image
                      src={pic}
                      alt=""
                      className="h-14 w-14 rounded-lg object-cover object-center"
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
      {selectedShop && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx('', {
            'opacity-100 transition-all duration-1000': selectedShop,
            'opacity-0 ': !selectedShop,
          })}
        >
          <div>adsjfsjkldflk </div>
        </form>
      )}
    </div>
  )
}

export default AddReview
