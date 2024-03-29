import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import { Review } from '@prisma/client'
import { trpc } from '../../utils/trpc'
import { faUser } from '@fortawesome/free-regular-svg-icons'

const ReviewDisplay: FC<{ review: Review }> = ({ review }) => {
  const user = trpc.users.getById.useQuery(review.userId).data

  const ReviewStars = () => {
    let stars = []
    for (let i = 0; i < review.rating; i++) {
      stars.push(
        <span key={i}>
          <FontAwesomeIcon icon={faStar} style={{ color: '#f5eb3b' }} />
        </span>
      )
    }
    return <div>{stars}</div>
  }

  const formattedDate = review.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div>
      <div className="divider text-black"></div>
      <div className="flex gap-10">
        <div className="flex w-1/12 flex-col items-center justify-between gap-2">
          <FontAwesomeIcon icon={faUser} size="3x" />
          <div className="font-extralight capitalize italic">{user?.name}</div>
        </div>
        <div className="flex flex-col justify-between pt-1 pr-5">
          <div>
            <div className="flex items-center text-xl">
              <div>{review.title}</div>
              <div className="ml-3 flex items-center justify-center">{ReviewStars()}</div>
            </div>
            <div className="font-light">{review.description}</div>
          </div>
          <div className="text-sm font-light">Reviewed at {formattedDate}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewDisplay
