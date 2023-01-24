import { Shop } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { trpc } from '../utils/trpc'
import Rate from './Rate'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlass, faMugHot, faUtensils, IconPrefix } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const AddForm = () => {
  const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    priceTag: yup.string().required('Required'),
    rating: yup.number().required('Required'),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Shop>({
    resolver: yupResolver(validationSchema),
  })

  const session = useSession()

  const types = [{ title: 'coffee shop' }, { title: 'restaurant' }, { title: 'bar' }]

  const [selectedType, setSelectedType] = useState<number>()

  const prices = ['$', '$$', '$$$', '$$$$']

  const [selectedPrice, setSelectedPrice] = useState(0)
  const [rating, setRating] = useState(0)

  // useEffect(() => {
  //   setValue('priceTag', '$'.repeat(selectedPrice))
  //   setValue('rating', rating)
  // }, [selectedPrice, rating])

  const mutation = trpc.shops.createShop.useMutation()

  async function handleCreation(data: any) {
    await mutation.mutateAsync(data)
    router.push('/home', undefined, { shallow: false })
  }

  const router = useRouter()

  const onSubmit: SubmitHandler<Shop> = async (data) => {
    console.log(data)
    handleCreation(data)
  }

  return (
    <div className="p-12 px-24">
      <div>
        <div className="text-6xl font-extrabold">What kinda of place it is?</div>
        <div className="mt-16 flex gap-10">
          <div
            className="cursor-pointer rounded-full border-2 border-gray-400 px-4 hover:border-black"
            onClick={() => setSelectedType(0)}
          >
            <FontAwesomeIcon icon={faMugHot} />
            <span className="ml-3 text-lg font-light">coffee shop</span>
          </div>
          <div
            className="cursor-pointer rounded-full border-2 border-gray-400 px-4 hover:border-black"
            onClick={() => setSelectedType(1)}
          >
            <FontAwesomeIcon icon={faUtensils} />
            <span className="ml-3 text-lg font-light">restaurant</span>
          </div>
          <div
            className="cursor-pointer rounded-full border-2 border-gray-400 px-4 hover:border-black"
            onClick={() => setSelectedType(2)}
          >
            <FontAwesomeIcon icon={faMartiniGlass} />
            <span className="ml-3 text-lg font-light">bar</span>
          </div>
        </div>
      </div>
      {/* <div className="text-start text-4xl font-bold">Add a place</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex justify-center">
        <div className="flex w-1/3 flex-col gap-1">
          <div className="text-2xl capitalize">title</div>
          <input
            {...register('title', { required: true })}
            className="input-bordered input w-full"
            type="text"
            placeholder=""
          />
          {errors && <p className="mt-2 text-xs text-red-600">{errors?.title?.message}</p>}
          <div className="mt-4 text-2xl capitalize">price</div>
          <div>
            {prices.map((_, idx) => (
              <span
                key={idx + 1}
                onClick={() => {
                  setSelectedPrice(idx + 1)
                }}
                className={`badge badge-lg mx-2 cursor-pointer p-4 text-xl ${
                  selectedPrice === idx + 1 ? 'bg-black' : 'bg-teal-700'
                }`}
              >
                {'$'.repeat(idx + 1)}
              </span>
            ))}
          </div>
          <div className="mt-4 text-2xl capitalize">rating</div>
          <div className="mb-4 self-start text-3xl">
            <Rate
              rating={rating}
              onRating={(rate: number) => setRating(rate)}
              count={5}
              color={{
                filled: '#f5eb3b',
                unfilled: '#DCDCDC',
              }}
            />
          </div>
          <div className="mt-4 mb-2 text-start text-2xl capitalize">image</div>
          <input
            type="file"
            className="text-grey-500 text-sm file:mr-5 file:rounded-full file:border-0 file:bg-teal-50 file:py-2 file:px-6 file:text-sm file:font-medium file:text-teal-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
          />
          <div className="modal-action flex justify-end">
            <button type="submit" className="btn mt-4 bg-teal-700 text-white">
              add
            </button>
          </div>
        </div>
      </form> */}
    </div>
  )
}

export default AddForm
