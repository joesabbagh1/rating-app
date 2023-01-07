import { type NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import CoffeeShop from '../../components/CoffeeShop'
import younes from '../../components/images/younes.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Rate from '../../components/Rate'
import { trpc } from '../../utils/trpc'
import { Shop } from '../../types/coffee-shop'

const Home: NextPage = () => {
  let name = 'joe'
  // let shop = {
  //   image: younes,
  //   title: 'Younes',
  //   priceTag: ['$$', '$'],
  //   rating: [3, 4],
  // }

  const mutation = trpc.shops.createShop.useMutation()
  const handleCreationg = () => {
    mutation.mutate({ title: title, priceTag: ['$'.repeat(selectedPrice)], rating: [rating] })
    setShops([...shops, { title: title, priceTag: ['$'.repeat(selectedPrice)], rating: [rating] }])
  }
  const [shops, setShops] = useState<Shop[]>([])
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [selectedPrice, setSelectedPrice] = useState(0)

  let initialShops: Shop[] | undefined = trpc.shops.getAll.useQuery().data

  useEffect(() => {
    if (initialShops) {
      setShops(initialShops)
    }
  }, [initialShops])

  const prices = ['$', '$$', '$$$', '$$$$']

  const onSubmit = (e: any) => {
    e.preventDefault()
    handleCreationg()
  }
  return (
    <div className="p-6">
      <Header />
      <h1 className="pt-16 pb-8 text-3xl">Coffee Shops:</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {shops?.map((coffeeShop, idx) => (
          <CoffeeShop
            key={idx}
            image={younes}
            title={coffeeShop.title}
            priceTag={coffeeShop.priceTag}
            rating={coffeeShop.rating}
          />
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
          <div className="text-center text-5xl">
            <label htmlFor="my-modal-3" className="modal-button">
              <FontAwesomeIcon icon={faCirclePlus} className="cursor-pointer hover:text-teal-700" />
            </label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <label htmlFor="my-modal-3" className="modal cursor-pointer">
              <label className="modal-box relative">
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-2xl capitalize">title</div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Type here"
                      className="input-bordered input mb-4 w-full"
                    />
                    <div className="text-2xl capitalize">price</div>
                    <div>
                      {prices.map((_, idx) => (
                        <span
                          key={idx + 1}
                          onClick={() => {
                            setSelectedPrice(idx + 1)
                          }}
                          className={`badge badge-lg mx-2 cursor-pointer p-4 text-xl ${
                            selectedPrice === idx + 1 ? 'bg-black' : 'bg-teal-700'
                          }`}
                        >
                          {'$'.repeat(idx + 1)}
                        </span>
                      ))}
                    </div>
                    <div className="text-2xl capitalize">rating</div>
                    <div className="mb-4 self-start text-3xl">
                      <Rate
                        rating={rating}
                        onRating={(rate: number) => setRating(rate)}
                        count={5}
                        color={{
                          filled: '#f5eb3b',
                          unfilled: '#DCDCDC',
                        }}
                      />
                    </div>
                    <div className="mb-2 text-start text-2xl capitalize">image</div>
                    <input
                      type="file"
                      className="text-grey-500 text-sm
                          file:mr-5 file:rounded-full file:border-0
                          file:bg-teal-50 file:py-2
                          file:px-6 file:text-sm
                          file:font-medium file:text-teal-700
                          hover:file:cursor-pointer hover:file:bg-blue-50
                          hover:file:text-blue-700
                        "
                    />
                    <div className="modal-action flex justify-end">
                      <button type="submit">
                        <label htmlFor="my-modal-3" className="btn bg-teal-700 text-white">
                          add
                        </label>
                      </button>
                    </div>
                  </div>
                </form>
              </label>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
