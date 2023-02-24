import { Shop } from '@prisma/client'
import { bool } from 'aws-sdk/clients/signer'
import clsx from 'clsx'
import Image from 'next/image'
import router from 'next/router'
import { FC, useState } from 'react'

const ShopSearched: FC<{
  shop: Shop
  setShowRes: (T: bool) => void
}> = ({ shop, setShowRes }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  function redirectShop(shopId: string) {
    router.push(`/review/add/${shopId}`)
  }

  return (
    <div
      className="cursor-pointer px-6 py-3 transition duration-200 ease-in-out hover:bg-black hover:bg-opacity-5"
      onClick={() => {
        setShowRes(false), redirectShop(shop.id)
      }}
    >
      <div className="flex items-center gap-1">
        {shop.imageURL && (
          <Image
            src={shop.imageURL}
            width={100}
            height={100}
            alt=""
            className={clsx('z-50 aspect-square rounded-lg object-cover object-center', {
              'w-14': isImageLoaded,
              'hidden ': !isImageLoaded,
            })}
            onLoadingComplete={handleImageLoad}
            priority={true}
          />
        )}
        {!isImageLoaded && (
          <div className="aspect-square w-14 animate-pulse rounded-lg bg-gray-300"></div>
        )}
        <div>
          <div className="text-sm font-bold">{shop.title}</div>
          <div className="text-sm font-light">
            {shop.city}, {shop.street}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopSearched
