import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import younes from '../../../components/images/younes.jpeg'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'
import { NextPage } from 'next'
import ReviewDisplay from '../../../components/reviews/ReviewDisplay'
import ShopLocation from '../../../components/reviews/ShopLocation'

const ShopPage: NextPage<any> = ({ shopId }) => {
  const shop = trpc.shops.getById.useQuery(shopId).data

  return (
    <div className="grid grid-cols-2 gap-40 p-12">
      <div className="flex flex-col">
        <Image height={400} src={younes} alt="" className="rounded-t-2xl" />
        <div>
          <ShopLocation />
        </div>
      </div>
      <div>
        <div className=" text-4xl font-bold">Reviews</div>
        <ReviewDisplay />
        <ReviewDisplay />
        <ReviewDisplay />
        <ReviewDisplay />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  const { id: shopId } = context.query

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `api/auth/signin`,
      },
    }
  } else {
    return { props: { shopId } }
  }
}
export default ShopPage
