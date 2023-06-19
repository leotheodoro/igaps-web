import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth].api'

const updateBusinessUnitBodySchema = z.object({
  name: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.access_level !== 1) {
    return res.status(401).end()
  }

  const businessUnitId = String(req.query.id)

  if (!businessUnitId) {
    return res.status(404).send({ message: 'Business unit not found' })
  }

  const { name } = updateBusinessUnitBodySchema.parse(req.body)

  const businessUnit = await prisma.businessUnit.update({
    where: {
      id: businessUnitId,
    },
    data: {
      name,
    },
  })

  return res.status(200).json(businessUnit)
}
