import PrismaService from './prisma.service'

const prisma = PrismaService

async function getRenterCars(id: string) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      cars: true,
    },
  })
}

export { getRenterCars }
