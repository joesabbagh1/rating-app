import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import younes from './images/younes.jpeg'
import { router } from '../server/trpc/trpc'

type getIcon = (idx: number) => any

type coffeeShop = {
  coffeeShop: Shop
}
const CoffeeShop: FC<coffeeShop> = ({ coffeeShop }) => {
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

  return (
    <div className="ransition cursor-pointer flex-col gap-3 decoration-slate-800 duration-100 ease-in-out hover:bg-white hover:opacity-80">
      <Image src={younes} alt="" className="" />
      <div className="mt-3 text-lg font-semibold decoration-8">{coffeeShop.title}</div>
      <span className="text-lg font-light">Price: {getPrice()}</span>
      <div className="flex justify-between">
        <div>
          {starRating} <span className="text-sm font-light">1 review</span>
        </div>
      </div>
    </div>
  )
}

export default CoffeeShop
