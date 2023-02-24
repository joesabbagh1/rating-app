import { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import SearchReview from '../../../components/reviews/SearchShop'

const shopAdd: NextPage = () => {
  return (
    <>
      <SearchReview />
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `api/auth/signin`,
      },
    }
  } else {
    return { props: {} }
  }
}
export default shopAdd
