import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.access_level !== 1) {
    return res.status(401).end()
  }

  const positionId = String(req.query.id)

  if (!positionId) {
    return res.status(404).send({ message: 'Position not found' })
  }

  const position = await prisma.position.delete({
    where: {
      id: positionId,
    },
  })

  return res.status(200).json(position)
}
