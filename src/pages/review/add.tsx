import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import AddReview from '../../components/reviews/AddReview'

const shopAdd: NextPage = () => {
  return (
    <>
      <AddReview />
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
