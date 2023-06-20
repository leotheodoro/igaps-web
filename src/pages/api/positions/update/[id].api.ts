import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth].api'

const updateDepartmentBodySchema = z.object({
  name: z.string(),
  goal: z.string(),
  cbo: z.string(),
  departmentId: z.string(),
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

  const positionId = String(req.query.id)

  if (!positionId) {
    return res.status(404).send({ message: 'Department not found' })
  }

  const { name, goal, cbo, departmentId } = updateDepartmentBodySchema.parse(
    req.body,
  )

  const position = await prisma.position.update({
    where: {
      id: positionId,
    },
    data: {
      name,
      goal,
      cbo,
      department_id: departmentId,
    },
  })

  return res.status(200).json(position)
}
