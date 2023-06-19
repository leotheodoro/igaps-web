import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.access_level !== 1) {
    return res.status(401).end()
  }

  const departments = await prisma.department.findMany()

  return res.status(200).json(departments)
}
