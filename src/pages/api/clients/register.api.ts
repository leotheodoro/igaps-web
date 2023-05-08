import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../auth/[...nextauth].api'

const registerClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cnpj: z.string(),
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

  const { name, email, cnpj } = registerClientBodySchema.parse(req.body)

  const clientExists = await prisma.client.findFirst({
    where: {
      email,
    },
  })

  if (clientExists) {
    return res.status(400).json({ message: 'Cliente e-mail already taken' })
  }

  const client = await prisma.client.create({
    data: {
      name,
      email,
      cnpj,
    },
  })

  return res.status(201).json(client)
}
