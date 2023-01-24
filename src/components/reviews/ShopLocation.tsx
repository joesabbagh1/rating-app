import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC, useState, useEffect } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import pic from '../images/pic.jpeg'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const CoffeeShop: FC = () => {
  return (
    <div>
      <div className="py-3">
        <FontAwesomeIcon size="lg" icon={faLocationDot} />
        <span className="pl-2 font-light italic">Badaro, Beirut</span>
      </div>
    </div>
  )
}

export default CoffeeShop
