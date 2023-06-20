import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth].api'

const updateDepartmentBodySchema = z.object({
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

  const departmentId = String(req.query.id)

  if (!departmentId) {
    return res.status(404).send({ message: 'Department not found' })
  }

  const { name } = updateDepartmentBodySchema.parse(req.body)

  const department = await prisma.department.update({
    where: {
      id: departmentId,
    },
    data: {
      name,
    },
  })

  return res.status(200).json(department)
}
