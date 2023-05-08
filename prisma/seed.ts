const Prisma = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new Prisma.PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin', 12)

  await prisma.user.upsert({
    where: { email: 'admin@2rfp.com.br' },
    update: {},
    create: {
      email: 'admin@2rfp.com.br',
      name: 'Admin',
      password,
      access_level: 1,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
