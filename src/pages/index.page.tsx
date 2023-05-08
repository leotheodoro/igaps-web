import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

export { default } from './dashboard'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  console.log({ session })

  const clients =
    session.user.access_level === 0
      ? await prisma.client.findMany({
          where: { id: session.user.client_id },
        })
      : await prisma.client.findMany()

  return {
    props: {
      clients: JSON.parse(JSON.stringify(clients)),
      loggedUser: JSON.parse(JSON.stringify(session.user)),
    },
  }
}
