import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf, IconLookup, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Image, { StaticImageData } from 'next/image'
import { CoffeeShop } from '../types/coffee-shop'

type getIcon = (idx: number) => any

const CoffeeShop: FC<CoffeeShop> = ({ image, title, priceTag, rating }) => {
  const avgRating = useMemo(() => {
    const total = rating.reduce((acc, curr) => acc + curr, 0)
    return total / rating.length
  }, [rating])

  const avgPrice: number = useMemo(() => {
    const total: string = priceTag.reduce((acc: string, curr: string) => acc + curr, '')
    return total.length / priceTag.length
  }, [priceTag])

  const getIcon: getIcon = (idx) => {
    if (idx <= avgRating) {
      return faStar
    }
    if (idx > avgRating && idx === Math.ceil(avgRating)) {
      return faStarHalf
    }
  }

  const getPrice = () => {
    let price = ''
    for (let i = 0; i < avgPrice; i++) {
      price += '$'
    }
    return price
  }

  const starRating = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => <FontAwesomeIcon key={idx} icon={getIcon(idx)} style={{ color: '#f5eb3b' }} />)
  }, [rating, getIcon])

  return (
    <div
      className="
				bg-white-100
				text-grey-700
				min-h-[18rem]
				max-w-[20rem]
				overflow-hidden
				rounded-md
				shadow-lg
			"
    >
      <Image src={image} alt="" />
      <div className="flex-col gap-3 p-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-lg font-semibold">Price: {getPrice()}</span>
        <div>
          {starRating}
          <span className="text-sm font-semibold">~{avgRating}</span>
        </div>
      </div>
    </div>
  )
}

export default CoffeeShop
