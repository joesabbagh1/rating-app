import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { trpc } from '../../utils/trpc'

const shopAdd: NextPage = () => {
  const { data: session } = useSession()

  const places = trpc.favorite.getAllShopPerUser.useQuery(session?.user?.id ?? '').data
  return (
    <div>
      <div>
        {places?.map((place) => (
          <div>{place.id}</div>
        ))}
      </div>
    </div>
  )
}
export default shopAdd
