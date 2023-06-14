import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../auth/[...nextauth].api'

const registerBusinessUnitBodySchema = z.object({
  name: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user.access_level !== 1) {
    return res.status(401).end()
  }

  const { name } = registerBusinessUnitBodySchema.parse(req.body)

  const user = await prisma.businessUnit.create({
    data: {
      name,
    },
  })

  return res.status(201).json(user)
}
