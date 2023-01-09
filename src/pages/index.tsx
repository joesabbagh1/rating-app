import { GetServerSideProps, NextPage } from 'next'

const IndexPage: NextPage = () => null

const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/home`,
      permanent: false,
    },
  }
}

export { getServerSideProps }
export default IndexPage
