import { type NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import CoffeeShop from '../../components/CoffeeShop'
import younes from '../../components/images/younes.jpeg'
import { trpc } from '../../utils/trpc'
import { Shop } from '@prisma/client'
import AddForm from '../../components/AddForm'
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

  function handleData(data: Shop) {
    setShops([...shops, data])
  }

  return (
    <div className="p-6">
      <Header />
      <h1 className="pt-16 pb-8 text-3xl">Coffee Shops:</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {shops?.map((coffeeShop, idx) => (
          <CoffeeShop key={idx} coffeeShop={coffeeShop} />
        ))}
        <div
          className="
            flex
            min-h-[18rem]
            max-w-[15rem]
            flex-col
            place-content-center
          "
        >
          <Link href="/shop">
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="h-10 cursor-pointer hover:text-teal-700"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
