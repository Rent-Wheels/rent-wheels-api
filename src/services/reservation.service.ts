import { FilterQuery } from 'mongoose'

import { findUser } from './user.service'
import { ReservationStatus } from '../models/enums'
import { Reservation } from '../models/dto/userInputs'
import ReservationModel from '../models/reservations.mongo'

async function createReservation(reservationDetails: Reservation) {
  const reservation = await ReservationModel.create(reservationDetails)

  const customer = await findUser({ _id: reservation.customer.id })
  const renter = await findUser({ _id: reservation.renter })
  if (!customer || !renter) throw new Error('Reservation could not be created')

  await customer.addReservation(reservation._id)
  await renter.addReservation(reservation._id)

  return reservation
}

async function updateReservationStatus({
  status,
  filter,
}: {
  status: ReservationStatus
  filter: FilterQuery<Reservation>
}) {
  const reservation = await ReservationModel.findOne(filter)

  if (!reservation) throw new Error('Reservation does not exist')

  return await reservation.updateStatus(status)
}

export { createReservation, updateReservationStatus }
