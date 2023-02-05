import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import React, { useMemo, FC, useState, useEffect } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import pic from '../images/pic.jpeg'

type getIcon = (idx: number) => any

const Shop: FC<{ shop: Shop }> = ({ shop }) => {
  const session = useSession()

  const favShop = trpc.favorite.getById.useQuery({
    userId: session.data?.user?.id,
    shopId: shop.id,
  })

  const [favorite, setFavorite] = useState(false)
  useEffect(() => {
    if (favShop.status === 'success') {
      setFavorite(favShop.data?.length !== 0 ? true : false)
    }
  }, [favShop.data])

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
      handleCreation({ userId: session.data?.user?.id, shopId: shop.id })
    } else {
      handleDeletion({ userId: session.data?.user?.id, shopId: shop.id })
    }
  }

  return (
    <div className="relative">
      <button
        className="absolute left-auto right-3 top-3 z-50 scale-110 cursor-pointer"
        onClick={() => handleFavShop()}
      >
        <FontAwesomeIcon
          className="rounded-full bg-white p-2"
          icon={favorite ? faHeartSolid : faHeartRegular}
          color={favorite ? 'red' : 'black'}
        />
      </button>
      <Link href={{ pathname: `/shop/${shop.id}` }}>
        <div className="cursor-pointer flex-col gap-3 transition duration-200 ease-in-out hover:bg-white hover:opacity-80">
          <Image src={pic} alt="" />
          <div className="mt-3 text-lg font-semibold decoration-8">{shop.title}</div>
          {shop.rating && shop.price ? (
            <>
              <span className="text-lg font-light">Price: {getPrice()}</span>
              <div className="flex justify-between">
                <div>
                  {starRating} <span className="text-sm font-light">1 review</span>
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
