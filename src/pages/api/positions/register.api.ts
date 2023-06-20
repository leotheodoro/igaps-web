import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../auth/[...nextauth].api'

const registerDepartmentBodySchema = z.object({
  name: z.string(),
  goal: z.string(),
  cbo: z.string(),
  departmentId: z.string(),
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

  const activeBusinessUnit = await prisma.businessUnit.findFirst({
    where: {
      is_active: true,
    },
  })

  if (!activeBusinessUnit) {
    return res.status(400).send({ message: 'No active business unit' })
  }

  const { name, goal, cbo, departmentId } = registerDepartmentBodySchema.parse(
    req.body,
  )

  const position = await prisma.position.create({
    data: {
      name,
      goal,
      cbo,
      department_id: departmentId,
    },
  })

  return res.status(201).json(position)
}
