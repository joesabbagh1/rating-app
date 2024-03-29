import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'
import { NextPage } from 'next'
import ReviewDisplay from '../../../components/reviews/ReviewDisplay'
import {
  faChevronDown,
  faChevronUp,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import younes from '../../../../public/images/younes.jpeg'
import clsx from 'clsx'

const ShopPage: NextPage<any> = ({ shopId }) => {
  const shop = trpc.shops.getById.useQuery(shopId).data
  const reviews = trpc.reviews.getByShop.useQuery(shopId).data
  const reviewsCount = trpc.reviews.getReviewsCountPerShop.useQuery(shopId).data

  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [hover, setHover] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const ReviewStars = () => {
    let stars = []
    if (shop?.rating) {
      for (let i = 0; i < shop.rating; i++) {
        stars.push(
          <span key={i}>
            <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} size="2x" />
          </span>
        )
      }
    }
    return <div>{stars}</div>
  }

  const getPrice = () => {
    let price = ''
    if (shop?.price) {
      for (let i = 0; i < shop.price; i++) {
        price += '$'
      }
    }
    return price
  }

  const scrollToReviews = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const router = useRouter()
  function redirectShop() {
    router.push(`/review/add/${shopId}`)
  }

  return (
    <div className="p-12 px-24">
      <button
        className={clsx(
          'btn-primary btn fixed bottom-12 right-12 transform rounded-full transition-all duration-300 ease-in-out hover:bg-transparent hover:text-black',
          {
            'visible opacity-100': scrollY > 200,
            'invisible opacity-0': scrollY < 200,
          }
        )}
        onClick={() => goTop()}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>

      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col justify-between">
          <div className="text-3xl">
            {reviewsCount
              ? `According to ${reviewsCount} reviewer${reviewsCount === 1 ? '' : 's'}:`
              : 'No reviews yet'}
          </div>
          <div className="flex items-center">
            <div className="mr-6 h-24 w-1 border-r-4 border-black"></div>
            <div>
              <div className="pb-3 text-2xl font-medium">Average Rating:</div>
              <div>{ReviewStars()}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-6 h-24 w-1 border-r-4 border-black"></div>
            <div>
              <div className="pb-3 text-2xl font-medium">Price Range:</div>
              <div className="text-3xl">{getPrice()}</div>
            </div>
          </div>
          <button
            className="btn-primary btn w-36 hover:bg-white hover:text-black"
            onClick={() => {
              redirectShop()
            }}
          >
            add a review
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <div className="p- w-full self-center" style={{ height: '55vh' }}>
            {shop?.imageURL && (
              <Image
                width={450}
                height={100}
                src={younes}
                alt=""
                className={clsx('rounded-2xl object-cover object-center', {
                  'w-full': isImageLoaded,
                  'hidden ': !isImageLoaded,
                })}
                style={{ height: '55vh' }}
                onLoadingComplete={handleImageLoad}
                priority={true}
              />
            )}
            {!isImageLoaded && (
              <div
                className="w-full animate-pulse rounded-2xl bg-gray-300"
                style={{ height: '55vh' }}
              ></div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-light capitalize">{shop?.title}</div>
            <div>
              <FontAwesomeIcon size="lg" icon={faLocationDot} />
              <span className="pl-2 font-light italic">
                {shop?.city}, {shop?.street}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-16 flex flex-col items-center justify-center">
        <button
          className="btn-primary btn rounded-3xl hover:bg-white hover:text-black"
          onClick={() => scrollToReviews()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          View Reviews
        </button>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="2x"
          className={clsx('transform text-black duration-300', {
            'translate-y-1 scale-110': hover,
          })}
        />
      </div>
      <div ref={ref} className="pt-8">
        <div className="text-4xl font-bold">Reviews</div>
        {reviews?.map((review) => (
          <ReviewDisplay review={review} />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const { id: shopId } = context.query

  return { props: { shopId } }
}
export default ShopPage
