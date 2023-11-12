import { ReservationStatus } from '../models/enums'
import PrismaService from './prisma.service'
import { Reservation } from '../models/dto/userInputs'

const prisma = PrismaService

async function getUserReservations(filter: Reservation) {
  return await prisma.reservations.findFirst({
    where: filter,
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

async function deleteReservation(filter: Reservation) {
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
