import { Shop } from '@prisma/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { trpc } from '../../utils/trpc'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlass, faMugHot, faUtensils } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import Image from 'next/image'

const AddForm = () => {
  const validationSchema = yup.object().shape({
    type: yup.string().required('Required'),
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    city: yup.string().required('Required'),
    street: yup.string(),
    picture: yup.mixed(),
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
  }

  const router = useRouter()

  async function uploadToS3(selectedFile: File) {
    // @ts-ignore
    const fileType = encodeURIComponent(selectedFile.type)

    const response = await fetch(`/api/media?fileType=${fileType}`)
    const data = await response.json()

    const { uploadUrl, getUrl } = data
    await fetch(uploadUrl, {
      method: 'PUT',
      body: selectedFile,
    })

    return getUrl
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    setSelectedFile(file || null)
  }

  const onSubmit: SubmitHandler<Shop> = async (data) => {
    const getUrl = selectedFile ? await uploadToS3(selectedFile) : ''
    console.log(getUrl)
    handleCreation({ ...data, imageURL: getUrl })
    router.push('/home', undefined, { shallow: false })
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
              <div className="flex items-center justify-between">
                <div className="text-2xl font-medium">Upload an image</div>
                <input
                  type="file"
                  accept="image/jpeg image/png"
                  name="file"
                  className="file-input-primary file-input"
                  onChange={handleFileInputChange}
                />
              </div>
              <div className="place-self-end">
                <button
                  className="btn-primary btn h-2 w-24 hover:bg-white hover:text-black"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AddForm
