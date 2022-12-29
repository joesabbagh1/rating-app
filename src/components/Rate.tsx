import React, { FC, useMemo, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Rate = {
  count: number
  rating: number
  color: any
  onRating: any
}

const Rate: FC<Rate> = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color.filled
    } else if (!hoverRating && rating >= index) {
      return color.filled
    }

    return color.unfilled
  }

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer"
          icon={faStar}
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))
  }, [count, rating, hoverRating])

  return <div>{starRating}</div>
}

export default Rate
