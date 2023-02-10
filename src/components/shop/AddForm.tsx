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
    additinalInfo: yup.string(),
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

  const session = useSession()

  const [type, setType] = useState<types>()
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
      <div className="text-6xl font-extrabold">What kind of place it is?</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-16 flex gap-10">
          <div
            className={clsx(
              'cursor-pointer rounded-full border-2 border-gray-400 px-4 hover:border-black',
              {
                'border-black': type === 'coffee shop',
              }
            )}
            onClick={() => {
              setStep(1), setType('coffee shop')
            }}
          >
            <FontAwesomeIcon icon={faMugHot} />
            <span className="ml-3 text-lg font-light">coffeee shop</span>
          </div>
          <div
            className={clsx(
              'cursor-pointer rounded-full border-2 border-gray-400 px-4 hover:border-black',
              {
                'border-black': type === 'restaurant',
              }
            )}
            onClick={() => {
              setStep(1), setType('restaurant')
            }}
          >
            <FontAwesomeIcon icon={faUtensils} />
            <span className="ml-3 text-lg font-light">restaurant</span>
          </div>
          <div
            className={clsx(
              'cursor-pointer rounded-full border-2 border-gray-400 px-4 hover:border-black',
              {
                'border-black': type === 'bar',
              }
            )}
            onClick={() => {
              setStep(1), setType('bar')
            }}
          >
            <FontAwesomeIcon icon={faMartiniGlass} />
            <span className="ml-3 text-lg font-light">bar</span>
          </div>
        </div>
        {step === 1 && (
          <div>
            <div className="mt-20 grid grid-cols-2 gap-20">
              <div className="flex flex-col justify-between gap-12">
                <div className="pr-40">
                  <div className="text-2xl font-medium">Title</div>
                  <input
                    {...register('title', { required: true })}
                    className="input-bordered input mt-4 h-10 w-full"
                  />
                </div>
                <div className="pr-40">
                  <div className="text-2xl font-medium">Description</div>
                  <input
                    {...register('description', { required: true })}
                    className="input-bordered input mt-4 h-10 w-full"
                  />
                </div>
              </div>
            </div>
            <button
              className="btn-primary btn mt-12 w-24 hover:bg-white hover:text-black"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mt-20 grid grid-cols-2 gap-20">
              <div className="flex flex-col justify-between gap-12">
                <div className="pr-40">
                  <div className="text-2xl font-medium">City</div>
                  <input
                    {...register('city', { required: true })}
                    className="input-bordered input mt-4 h-10 w-full"
                  />
                </div>
                <div className="pr-40">
                  <div className="text-2xl font-medium">Street</div>
                  <input
                    {...register('street', { required: true })}
                    className="input-bordered input mt-4 h-10 w-full"
                  />
                </div>
              </div>
              <div className="gap- flex flex-col justify-between">
                <div className="text-2xl font-medium">Additinal Info</div>
                <textarea
                  {...register('additionalInfo', { required: true })}
                  className="input-bordered input mt-4 h-full w-full resize-none"
                />
              </div>
            </div>
          <div className="flex justify-between">
              <button
                className="btn-primary btn mt-12 h-2 w-24 hover:bg-white hover:text-black"
                onClick={() => setStep(1)}
              >
                Back
              </button>
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
