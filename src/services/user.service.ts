import { Roles } from '../models/enums'
import { User } from '../models/dto/userInputs'
import PrismaService from './prisma.service'

const prisma = PrismaService

async function findUser(filter: User) {
  return await prisma.users.findFirst({
    where: filter,
  })
}

async function findRenter(filter: User) {
  return await prisma.users.findFirst({
    where: {
      ...filter,
      role: Roles.Renter,
    },
    include: {
      cars: true,
    },
  })
}

async function createUser(userDetails: User) {
  return await prisma.users.create({
    data: userDetails,
  })
}

async function updateUser({ filter, data }: { filter: User; data: User }) {
  return await prisma.users.update({
    where: filter,
    data,
  })
}

async function deleteUser({ role, id }: { role: Roles; id: string }) {
  const isRenter = role === Roles.Renter
  const deleteUser = prisma.users.delete({
    where: {
      id,
    },
  })

  const deleteReservations = prisma.reservations.deleteMany({
    where: {
      customerId: isRenter ? undefined : id,
      renterId: isRenter ? id : undefined,
    },
  })

  if (!isRenter) return await prisma.$transaction([deleteReservations, deleteUser])

  return await prisma.$transaction([
    deleteReservations,
    prisma.cars.deleteMany({
      where: {
        ownerId: id,
      },
    }),
    deleteUser,
  ])
}

async function getUserReservationHistory(filter: User) {
  return await prisma.users.findFirst({
    where: filter,
    select: {
      customerReservations: true,
    },
  })
}

async function upgradeToRenter(filter: User) {
  return await prisma.users.update({
    where: filter,
    data: {
      role: Roles.Renter,
    },
  })
}

export {
  findUser,
  findRenter,
  createUser,
  updateUser,
  deleteUser,
  upgradeToRenter,
  getUserReservationHistory,
}
