import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, FC } from 'react'
import { Shop } from '@prisma/client'
import Image from 'next/image'
import younes from './images/younes.jpeg'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'
import { NextPage } from 'next'

const ShopPage: NextPage<any> = ({ shopId }) => {
  const shop = trpc.shops.getById.useQuery(shopId).data

  console.log(shop)

  return <div>{shop?.title}</div>
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
