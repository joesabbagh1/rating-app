import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'

const ShopLocation: FC = () => {
  return (
    <div>
      <div className="py-3">
        <FontAwesomeIcon size="lg" icon={faLocationDot} />
        <span className="pl-2 font-light italic">Badaro, Beirut</span>
      </div>
    </div>
  )
}

export default ShopLocation
