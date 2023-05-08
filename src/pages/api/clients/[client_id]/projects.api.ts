import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const clientId = String(req.query.client_id)

  if (session.user.access_level === 0 && session.user.client_id !== clientId) {
    return res.status(403).end()
  }

  const projects = await prisma.table.findMany({
    where: {
      client_id: clientId,
    },
  })

  return res.status(200).json(projects ?? [])
}
