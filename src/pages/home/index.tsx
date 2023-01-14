import { type NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CoffeeShop from '../../components/CoffeeShop'
import { trpc } from '../../utils/trpc'
import { Shop } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Home: NextPage = () => {
  const [shops, setShops] = useState<Shop[]>([])

  let initialShops: Shop[] | undefined = trpc.shops.getAll.useQuery().data

  useEffect(() => {
    if (initialShops) {
      setShops(initialShops)
    }
  }, [initialShops])

  return (
    <div className="p-6 px-12">
      <div>
        <h1 className="py-8 text-3xl">Shops</h1>
        <div className="grid grid-cols-2 gap-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {shops?.map((coffeeShop, idx) => (
            <CoffeeShop key={idx} coffeeShop={coffeeShop} />
          ))}
          <div
            className="
            flex
            min-h-[18rem]
            flex-col
            place-content-center
            items-center
          "
          >
            <Link href="/shop/add">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="h-10 cursor-pointer hover:text-teal-700"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-28">
        <h1 className="py-8 text-3xl">Recent Reviews</h1>
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {shops?.map((coffeeShop, idx) => (
            <CoffeeShop key={idx} coffeeShop={coffeeShop} />
          ))}
          <div
            className="
            flex
            min-h-[18rem]
            flex-col
            place-content-center
            items-center
          "
          >
            <Link href="/shop/add">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="h-10 cursor-pointer hover:text-teal-700"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
