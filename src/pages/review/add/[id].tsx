import { Review, Shop } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import pic from '../../../components/images/pic.jpeg'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { trpc } from '../../../utils/trpc'
import { NextPage } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import Image from 'next/image'
import { appRouter } from '../../../server/trpc/router/_app'
import { createContext } from '../../../server/trpc/context'
import ShopLocation from '../../../components/reviews/ShopLocation'
import Rate from '../../../components/Rate'

const AddReview = (shop: Shop) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    price: yup.number().required('Required'),
    rating: yup.number().required('Required'),
  })

  const { data: session } = useSession()

  const [rating, setRating] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Review>({
    resolver: yupResolver(validationSchema),
  })

  function handlePrice(priceInput: string) {
    if (priceInput === '0') {
      setPrice(1)
    } else if (priceInput === '50') {
      setPrice(2)
    } else {
      setPrice(3)
    }
  }

  useEffect(() => {
    console.log(price)
    setValue('price', price)
    setValue('rating', rating)
  }, [price, rating])
  const mutation = trpc.reviews.createReview.useMutation()

  async function handleCreation(data: any) {
    await mutation.mutateAsync(data)
    router.push('/home', undefined, { shallow: false })
  }

  const router = useRouter()

  const onSubmit: SubmitHandler<Review> = async (data) => {
    const req = { ...data, userId: session?.user?.id, shopId: shop.id }
    handleCreation(req)
  }

  return (
    <div className="p-12 px-24">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-24">
          <div className="flex flex-col">
            <Image height={500} src={pic} alt="" className="rounded-t-2xl" />
            <div>
              <ShopLocation />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-10">
              <div>
                <div className="text-xl font-medium">Title your review</div>
                <input
                  {...register('title', { required: true })}
                  className="input-bordered input mt-2 h-10 w-full"
                />
              </div>
              <div>
                <div className="text-xl font-medium">Your review</div>
                <textarea
                  {...register('description', { required: true })}
                  className="input-bordered input mt-2 h-28 w-full resize-none"
                />
              </div>
              <div className="flex justify-center gap-20">
                <div className="w-1/2">
                  <div className="mb-3 text-center text-xl font-medium">Price</div>
                  <div className="px-">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="range"
                      step="50"
                      onChange={(e) => {
                        handlePrice(e.target.value)
                      }}
                    />
                  </div>
                  <div className="relative flex w-full justify-center text-xs">
                    <span className="absolute left-0 text-base">$</span>
                    <span className=" text-base">$$</span>
                    <span className="absolute right-0 text-base">$$$</span>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="mb-3 text-center text-xl font-medium">Rating</div>
                  <div className="text-center text-3xl">
                    <Rate
                      rating={rating}
                      onRating={(rate: number) => setRating(rate)}
                      count={5}
                      color={{
                        filled: '#000000',
                        unfilled: '#DCDCDC',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-between">
          <button
            className="btn-primary btn hover:bg-white hover:text-black"
            onClick={() => {
              router.back()
            }}
          >
            Back
          </button>
          <button type="submit" className="btn-primary btn hover:bg-white hover:text-black">
            Publish
          </button>
        </div>
      </form>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  const { id: shopId } = context.query

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(context),
  })

  const shop = await ssg.shops.getById.fetch(shopId)

  if (!shop) {
    return {
      redirect: {
        permanent: false,
        destination: `api/auth/signin`,
      },
    }
  }

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `api/auth/signin`,
      },
    }
  } else {
    return { props: shop }
  }
}
export default AddReview