import { GetServerSideProps, NextPage } from 'next'
import { nopeResolver } from '@hookform/resolvers/nope'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { DiscordIcon, GoogleIcon } from '../../components/icons'
import * as yup from 'yup'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'

type SignInForm = {
  email: string
  password: string
}

const signinSchema = yup.object({
  email: yup.string().required('Required').email('Should be a valid email'),
  password: yup.string().required('Required'),
})

const SignInPage: NextPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: nopeResolver(signinSchema),
  })

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-2/6 flex-col rounded-3xl border border-black p-10">
        <div className="text-4xl font-bold">Login:</div>
        <div className="mt-6 mb-4 text-xl font-light">Sign in with:</div>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => {
              signIn('discord')
            }}
            className="flex cursor-pointer items-center justify-center rounded-lg border border-black px-4 py-1 transition duration-200 ease-out hover:bg-gray-200"
          >
            <DiscordIcon className="mr-3 h-8 w-8" style={{ fill: '#5865f2' }} />
            <span className="text-xl font-semibold">Discord</span>
          </div>
          <div
            onClick={() => {
              signIn('google')
            }}
            className="flex cursor-pointer items-center justify-center rounded-lg border border-black px-4 py-1 transition duration-200 ease-out hover:bg-gray-200"
          >
            <GoogleIcon className="mr-2 h-7 w-7" />
            <span className="text-xl font-semibold">Google</span>
          </div>
        </div>
        <Link href={`/auth/signup`} className="hover:text-primary-dark text-primary"></Link>
        <div className="divider font-bold">or</div>
        <button
          onClick={() => router.push('/home')}
          className="btn bg-white text-black hover:bg-black hover:text-white"
        >
          Continue exploring the site
        </button>
      </div>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default SignInPage
