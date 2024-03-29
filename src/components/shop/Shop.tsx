import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import React, { useMemo, FC, useState, useEffect } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import younes from '../../../public/images/younes.jpeg'
import clsx from 'clsx'

type getIcon = (idx: number) => any

const Shop: FC<{ shop: Shop; refetchParent: () => void }> = ({ shop, refetchParent }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data: favShop, refetch } = trpc.favorite.getById.useQuery(
    {
      userId: session?.user?.id,
      shopId: shop.id,
    },
    { enabled: !!session }
  )

  const [favorite, setFavorite] = useState<boolean>(false)
  // const [isImageLoaded, setIsImageLoaded] = useState(false)

  // const handleImageLoad = () => {
  //   setIsImageLoaded(true)
  // }

  useEffect(() => {
    if (favShop?.length === 0 || favShop === undefined) {
      setFavorite(false)
    } else {
      setFavorite(true)
    }
    refetchParent()
  }, [favShop])

  const createMutation = trpc.favorite.createFavorite.useMutation()

  async function handleCreation(data: any) {
    await createMutation.mutateAsync(data)
  }

  const deleteMutation = trpc.favorite.deleteFavorite.useMutation()

  async function handleDeletion(data: any) {
    await deleteMutation.mutateAsync(data)
  }

  async function handleFavShop() {
    setFavorite(!favorite)
    if (!favorite) {
      handleCreation({ userId: session?.user?.id, shopId: shop.id }).then(
        async () => await refetch()
      )
    } else {
      handleDeletion({ userId: session?.user?.id, shopId: shop.id }).then(
        async () => await refetch()
      )
    }
  }
  const { data: reviewCount } = trpc.reviews.getReviewsCountPerShop.useQuery(shop.id)

  const getIcon: getIcon = (idx) => {
    if (shop.rating && idx <= shop.rating) {
      return faStar
    }
  }

  const getPrice = () => {
    let price = ''
    if (shop.price) {
      for (let i = 0; i < shop.price; i++) {
        price += '$'
      }
    }
    return price
  }

  const starRating = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => <FontAwesomeIcon key={idx} icon={getIcon(idx)} style={{ color: '#f5eb3b' }} />)
  }, [shop.rating, getIcon])

  return (
    <div className="relative">
      <button
        className="absolute left-auto right-3 top-3 z-30 scale-110 cursor-pointer"
        onClick={() => {
          session ? handleFavShop() : router.push('/auth/signin')
        }}
      >
        <FontAwesomeIcon
          className="rounded-full bg-white p-2"
          icon={favorite ? faHeartSolid : faHeartRegular}
          color={favorite ? 'red' : 'black'}
        />
      </button>
      <Link href={{ pathname: `/shop/${shop.id}` }}>
        <div className="cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:opacity-80">
          {/* {shop.imageURL && ( */}
          <Image
            src={younes}
            alt="My Image"
            width={500}
            height={200}
            className="aspect-square h-56 w-full object-cover object-center"
            // className={clsx('object-cover object-center', {
            //   'h-56 w-full': isImageLoaded,
            //   'hidden ': !isImageLoaded,
            // })}
            // onLoadingComplete={handleImageLoad}
          />
          {/* )} */}
          {/* {!isImageLoaded && (
            <div className="h-56 w-full animate-pulse rounded-t-2xl bg-gray-300"></div>
          )} */}
          <div className="mt-3 text-lg font-semibold decoration-8">{shop.title}</div>
          {shop.rating && shop.price ? (
            <>
              <span className="text-lg font-light">Price: {getPrice()}</span>
              <div className="flex justify-between">
                <div>
                  {starRating}{' '}
                  <span className="text-sm font-light">
                    {reviewCount} review{reviewCount === 1 ? '' : 's'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div>No reviews yet</div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Shop
