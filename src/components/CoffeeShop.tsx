import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC } from 'react'
import { Shop } from '@prisma/client'

type getIcon = (idx: number) => any

type coffeeShop = {
  coffeeShop: Shop
}
const CoffeeShop: FC<coffeeShop> = ({ coffeeShop }) => {
  const getIcon: getIcon = (idx) => {
    if (idx <= coffeeShop.rating) {
      return faStar
    }
    if (idx > coffeeShop.rating && idx === Math.ceil(coffeeShop.rating)) {
      return faStarHalf
    }
  }

  const getPrice = () => {
    let price = ''
    for (let i = 0; i < coffeeShop.priceTag.length; i++) {
      price += '$'
    }
    return price
  }

  const starRating = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => <FontAwesomeIcon key={idx} icon={getIcon(idx)} style={{ color: '#f5eb3b' }} />)
  }, [coffeeShop.rating, getIcon])

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
      <div className="flex-col gap-3 p-5">
        <h2 className="text-2xl font-bold">{coffeeShop.title}</h2>
        <span className="text-lg font-semibold">Price: {getPrice()}</span>
        <div>
          {starRating}
          <span className="text-sm font-semibold">~{coffeeShop.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default CoffeeShop
