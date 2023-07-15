import { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import AddForm from '../../components/shop/AddForm'

const shopAdd: NextPage = () => {
  return (
    <>
      <AddForm />
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/auth/signin`,
      },
    }
  } else {
    return { props: {} }
  }
}
export default shopAdd
