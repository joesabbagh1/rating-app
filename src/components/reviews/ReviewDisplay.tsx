import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC, useState, useEffect } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import pic from '../images/pic.jpeg'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const CoffeeShop: FC = () => {
  return (
    <div>
      <div className="divider text-black"></div>
      <div className="flex">
        <div className="flex w-1/4 flex-col">
          <Image src={pic} alt="" className="h-36 w-36 rounded-full object-cover object-center" />
        </div>
        <div className="ml-6 w-3/4 pt-1 pr-5">
          <div className="flex items-center text-xl">
            <div>Dinner</div>
            <div className="ml-3 flex items-center justify-center">
              <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} />
              <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} />
            </div>
          </div>
          <div className="font-light">
            We had: Black Onyx sliders w/ fries- yummy slider, juice and didn’t need much beyond the
            cheese and flavored Mayo. Would order again Spicy Black Onyx Empanada- Would order again
            Spicy Black Onyx Empanada- Would order again Spicy Black Onyx Empanada- Would order
            again Spicy Black Onyx Empanada- not bad, good flavor. Not a must have again.{' '}
          </div>
          <div className="font-extralight italic">~Batata</div>
        </div>
      </div>
    </div>
  )
}

export default CoffeeShop
