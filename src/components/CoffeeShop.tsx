import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
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
    // <div
    //   className="
    // 		bg-white-100
    // 		text-grey-700
    // 		min-h-[18rem]
    // 		max-w-[20rem]
    // 		cursor-pointer
    //     overflow-hidden
    //     rounded-2xl bg-white shadow-xl
    //     shadow-slate-900/10 transition duration-300 ease-in-out hover:scale-105
    // 	"
    // >
    //   <Image src={younes} alt="" />
    //   <div className="flex-col gap-3 p-8">
    //     <h2 className="text-2xl font-bold">{coffeeShop.title}</h2>
    //     <span className="text-lg font-semibold">Price: {getPrice()}</span>
    //     <div>{starRating}</div>
    //     <div className="text-right text-lg font-light italic">By {coffeeShop.userName}</div>
    //   </div>
    // </div>
    <div className="">
      <Image src={younes} alt="" />
      <div className="flex-col gap-3">
        <div className="mt-3 text-2xl font-extralight">{coffeeShop.title}</div>
        <span className="text-lg font-light">Price: {getPrice()}</span>
        <div>
          {starRating} <span className="text-sm font-light">1 review</span>
        </div>
      </div>
    </div>
  )
}

export default CoffeeShop
