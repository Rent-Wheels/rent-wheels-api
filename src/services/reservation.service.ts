import { ReservationStatus } from '../models/enums'
import PrismaService from './prisma.service'
import { Reservation } from '../models/dto/userInputs'
import { Prisma } from '@prisma/client'

const prisma = PrismaService

async function getUserReservations(filter: Partial<Reservation>) {
  return await prisma.reservations.findMany({
    where: filter,
    select: {
      id: true,
      destination: true,
      price: true,
      returnDate: true,
      startDate: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      car: true,
      renter: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          profilePicture: true,
          placeOfResidence: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}

async function deleteUserReservations({
  renterId,
  customerId,
}: {
  renterId?: string
  customerId?: string
}) {
  return await prisma.reservations.deleteMany({
    where: {
      renterId,
      customerId,
    },
  })
}

async function createReservation(reservationDetails: Reservation) {
  return await prisma.reservations.create({
    data: reservationDetails,
    include: {
      car: true,
      renter: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          profilePicture: true,
          placeOfResidence: true,
        },
      },
    },
  })
}

async function updateReservationStatus({ id, status }: { id: string; status: ReservationStatus }) {
  return await prisma.reservations.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      car: true,
      renter: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          profilePicture: true,
          placeOfResidence: true,
        },
      },
    },
  })
}

async function updateReservation({
  id,
  reservationDetails,
}: {
  id: string
  reservationDetails: Reservation
}) {
  return await prisma.reservations.update({
    where: {
      id,
    },
    data: reservationDetails,
  })
}

async function deleteReservation(filter: Prisma.reservationsWhereUniqueInput) {
  return await prisma.reservations.delete({
    where: filter,
  })
}

export {
  createReservation,
  updateReservation,
  deleteReservation,
  getUserReservations,
  deleteUserReservations,
  updateReservationStatus,
}
