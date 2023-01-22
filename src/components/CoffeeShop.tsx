import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import React, { useMemo, FC, useState } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import younes from './images/younes.jpeg'
import { router } from '../server/trpc/trpc'
import Link from 'next/link'

type getIcon = (idx: number) => any

type coffeeShop = {
  coffeeShop: Shop
}
const CoffeeShop: FC<coffeeShop> = ({ coffeeShop }) => {
  const [favorite, setFavorite] = useState(false)

  const getIcon: getIcon = (idx) => {
    if (idx <= coffeeShop.rating) {
      return faStar
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

  function favShop() {
    setFavorite(!favorite)
  }

  return (
    <div className="relative">
      <button
        className="absolute left-auto right-3 top-3 z-50 cursor-pointer"
        onClick={() => favShop()}
      >
        <FontAwesomeIcon
          className="rounded-full bg-white p-2"
          icon={favorite ? faHeartSolid : faHeartRegular}
          color={favorite ? 'red' : 'black'}
        />
      </button>
      <Link href={{ pathname: `/shop/${coffeeShop.id}` }}>
        <div className="ransition cursor-pointer flex-col gap-3 decoration-slate-800 duration-100 ease-in-out hover:bg-white hover:opacity-80">
          <Image src={younes} alt="" />
          <div className="mt-3 text-lg font-semibold decoration-8">{coffeeShop.title}</div>
          <span className="text-lg font-light">Price: {getPrice()}</span>
          <div className="flex justify-between">
            <div>
              {starRating} <span className="text-sm font-light">1 review</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CoffeeShop
