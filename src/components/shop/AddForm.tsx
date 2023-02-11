import { Shop } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { trpc } from '../../utils/trpc'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlass, faMugHot, faUtensils } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

const AddForm = () => {
  const validationSchema = yup.object().shape({
    type: yup.string().required('Required'),
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    city: yup.string().required('Required'),
    street: yup.string(),
  })

  type types = 'coffee shop' | 'restaurant' | 'bar'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Shop>({
    resolver: yupResolver(validationSchema),
  })

  console.log(errors)

  const [type, setType] = useState<types>()
  const [hover, setHover] = useState<types | null>()
  const [step, setStep] = useState<number>()

  useEffect(() => {
    if (type) {
      setValue('type', type)
    }
  }, [type])

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
      <div className="text-6xl font-extrabold text-black">What kind of place it is?</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-16 flex gap-10">
          <div
            className={clsx(
              'cursor-pointer rounded-full border border-black px-4 transition duration-200 ease-out',
              {
                'bg-black text-white': hover === 'coffee shop' || type === 'coffee shop',
              }
            )}
            onClick={() => {
              setStep(1), setType('coffee shop')
            }}
            onMouseEnter={() => setHover('coffee shop')}
            onMouseLeave={() => setHover(null)}
          >
            <FontAwesomeIcon
              color="black"
              className={clsx('', {
                'text-black': hover !== 'coffee shop' || type !== 'coffee shop',
                'text-white': hover === 'coffee shop' || type === 'coffee shop',
              })}
              icon={faMugHot}
            />
            <span className="ml-3 text-lg font-light">coffeee shop</span>
          </div>
          <div
            className={clsx(
              'cursor-pointer rounded-full border border-black px-4 transition duration-200 ease-out',
              {
                'bg-black text-white': hover === 'restaurant' || type === 'restaurant',
              }
            )}
            onClick={() => {
              setStep(1), setType('restaurant')
            }}
            onMouseEnter={() => setHover('restaurant')}
            onMouseLeave={() => setHover(null)}
          >
            <FontAwesomeIcon
              color="gray"
              className={clsx('', {
                'text-black': hover !== 'restaurant' || type !== 'restaurant',
                'text-white': hover === 'restaurant' || type === 'restaurant',
              })}
              icon={faUtensils}
            />
            <span className="ml-3 text-lg font-light">restaurant</span>
          </div>
          <div
            className={clsx(
              'cursor-pointer rounded-full border border-black px-4 transition duration-200 ease-out',
              {
                'bg-black text-white': hover === 'bar' || type === 'bar',
              }
            )}
            onClick={() => {
              setStep(1), setType('bar')
            }}
            onMouseEnter={() => setHover('bar')}
            onMouseLeave={() => setHover(null)}
          >
            <FontAwesomeIcon
              color="gray"
              className={clsx('', {
                'text-black': hover !== 'bar' || type !== 'bar',
                'text-white': hover === 'bar' || type === 'bar',
              })}
              icon={faMartiniGlass}
            />
            <span className="ml-3 text-lg font-light">bar</span>
          </div>
        </div>
        {step === 1 && (
          <div>
            <div className="mt-20 grid grid-cols-2 gap-x-40 gap-y-12">
              <div>
                <div className="text-2xl font-medium">Title</div>
                <input
                  {...register('title', { required: true })}
                  className="input-bordered input mt-4 h-10 w-full"
                />
                {errors.title && <p className="mt-2 text-red-600">{errors.title.message}</p>}
              </div>
              <div>
                <div className="text-2xl font-medium">Description</div>
                <input
                  {...register('description', { required: true })}
                  className="input-bordered input mt-4 h-10 w-full"
                />
                {errors.description && (
                  <p className="mt-2 text-red-600">{errors.description.message}</p>
                )}
              </div>
              <div>
                <div className="text-2xl font-medium">City</div>
                <input
                  {...register('city', { required: true })}
                  className="input-bordered input mt-4 h-10 w-full"
                />
                {errors.city && <p className="text-m mt-2 text-red-600">{errors.city.message}</p>}
              </div>
              <div>
                <div className="text-2xl font-medium">Street</div>
                <input {...register('street')} className="input-bordered input mt-4 h-10 w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary btn mt-12 h-2 w-24 hover:bg-white hover:text-black"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AddForm
