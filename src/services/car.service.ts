import { Prisma } from '@prisma/client'
import { Car } from '../models/dto/userInputs'
import PrismaService from './prisma.service'

const prisma = PrismaService

async function availableCars(filter: Prisma.carsWhereInput) {
  return await prisma.cars.findMany({
    where: filter,
  })
}

async function findCar(filter: Partial<Car>) {
  return await prisma.cars.findFirst({
    where: filter,
  })
}

async function addCar({ carDetails, userId }: { carDetails: Car; userId: string }) {
  return await prisma.cars.create({
    data: {
      ...carDetails,
      ownerId: userId,
    },
  })
}

async function updateCar({ carDetails, id }: { carDetails: Car; id: string }) {
  return await prisma.cars.update({
    where: {
      id,
    },
    data: carDetails,
  })
}

async function deleteCar(id: string) {
  return await prisma.cars.delete({
    where: {
      id,
    },
  })
}

async function getCarHistory(filter: Partial<Car>) {
  return await prisma.cars.findFirst({
    where: filter,
    select: {
      rentalHistory: {
        include: {
          customer: {
            select: {
              name: true,
              email: true,
              phoneNumber: true,
              profilePicture: true,
              placeOfResidence: true,
            },
          },
        },
      },
    },
  })
}

async function changeAvailability({
  filter,
  availability,
}: {
  filter: Prisma.carsWhereUniqueInput
  availability: boolean
}) {
  return await prisma.cars.update({
    where: filter,
    data: {
      availability,
    },
  })
}

async function deleteCars(ownerId: string) {
  return await prisma.cars.deleteMany({
    where: {
      ownerId,
    },
  })
}

export {
  addCar,
  findCar,
  updateCar,
  deleteCar,
  getCarHistory,
  availableCars,
  changeAvailability,
  deleteCars,
}
