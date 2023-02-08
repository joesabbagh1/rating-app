import { type NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import ShopComp from '../../components/shop/Shop'
import { trpc } from '../../utils/trpc'
import { Shop } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import {
  faMartiniGlass,
  faMugHot,
  faUtensils,
  faHeart,
  faMap,
} from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

const Home: NextPage = () => {
  const { data: session } = useSession()

  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
  }, [])

  const [title, setTitle] = useState<string>('All Places')
  const [initialShops, setInitialShops] = useState<Shop[]>([])
  const [SavedShops, setSavedShops] = useState([])
  const [display, setDisplay] = useState('all')

  const allShops = trpc.shops.getAll.useQuery()
  // const filteredResults = trpc.favorite.getAllShopPerUser.useQuery(session?.user?.id ?? '')
  useEffect(() => {
    if (allShops.status === 'success') {
      setInitialShops(allShops.data)
    }
    // if (filteredResults.status === 'success') {
    // setSavedShops(filteredResults.data)
    // }
  }, [allShops.data])

  return (
    <div className="p-12 px-24">
      <div>
        <div className="mb-12 flex gap-2">
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-between rounded-xl border border-black p-3 transition-all duration-200 hover:bg-black hover:text-white',
              { 'bg-black text-white': display === 'all' }
            )}
            onClick={() => {
              setDisplay('all'), setTitle('All Places')
            }}
            style={{ width: width }}
          >
            <div>All Places</div>
            <FontAwesomeIcon icon={faMap} />
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-between rounded-xl border border-black p-3 transition-all duration-200 hover:bg-black hover:text-white',
              { 'bg-black text-white': display === 'saved' }
            )}
            onClick={() => setDisplay('saved')}
            style={{ width: width }}
          >
            <div>Saved Places</div>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-between gap-7 rounded-xl border border-black p-3 transition-all duration-300 hover:bg-black hover:text-white',
              { 'bg-black text-white': display === 'coffee shops' }
            )}
            ref={ref}
            onClick={() => {
              setDisplay('coffee shops'), setTitle('Coffee Shops')
            }}
          >
            <div>Coffee Shops</div>
            <FontAwesomeIcon icon={faMugHot} />
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-between rounded-xl border border-black p-3 transition-all duration-200 hover:bg-black hover:text-white',
              { 'bg-black text-white': display === 'restaurants' }
            )}
            onClick={() => {
              setDisplay('restaurants'), setTitle('Restaurants')
            }}
            style={{ width: width }}
          >
            <div>Restaurants</div>
            <FontAwesomeIcon icon={faUtensils} />
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-between rounded-xl border border-black p-3 transition-all duration-200 hover:bg-black hover:text-white',
              { 'bg-black text-white': display === 'bars' }
            )}
            onClick={() => {
              setDisplay('bars'), setTitle('Bars')
            }}
            style={{ width: width }}
          >
            <div>Bars</div>
            <FontAwesomeIcon icon={faMartiniGlass} />
          </div>
        </div>

        <h1 className="pb-8 text-3xl">{title}</h1>

        <div className="grid grid-cols-2 gap-5 gap-x-16 sm:grid-cols-2 lg:grid-cols-4">
          {display === 'all' &&
            initialShops?.map((shop, idx) => (
              <div>
                <ShopComp key={idx} shop={shop} />
              </div>
            ))}
          {display === 'coffee shops' &&
            initialShops
              ?.filter((shop) => shop.type === 'coffee shop')
              .map((shop, idx) => (
                <div>
                  <ShopComp key={idx} shop={shop} />
                </div>
              ))}
          {display === 'restaurants' &&
            initialShops
              ?.filter((shop) => shop.type === 'restaurant')
              ?.map((shop, idx) => (
                <div>
                  <ShopComp key={idx} shop={shop} />
                </div>
              ))}
          {display === 'bars' &&
            initialShops
              ?.filter((shop) => shop.type === 'bar')
              ?.map((shop, idx) => (
                <div>
                  <ShopComp key={idx} shop={shop} />
                </div>
              ))}
        </div>
      </div>
      {/* <div className="mt-28">
        <h1 className="py-8 text-3xl">Recent Reviews</h1>
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {shops?.map((shop, idx) => (
            <ShopComp key={idx} shop={shop} />
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
      </div> */}
    </div>
  )
}
export default Home
