import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

import { findUser } from './user.service'
import { ReservationStatus } from '../models/enums'
import { Reservation } from '../models/dto/userInputs'
import ReservationModel from '../models/reservations.mongo'

async function createReservation(reservationDetails: Reservation) {
  const customer = await findUser({ _id: reservationDetails.customer.id })
  const renter = await findUser({ _id: reservationDetails.renter })

  console.log(reservationDetails.customer.id, reservationDetails.renter)

  if (!customer || !renter) throw new Error('Reservation could not be created')

  const reservation = await ReservationModel.create(reservationDetails)

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

async function updateReservation(
  filter: FilterQuery<Reservation>,
  update: UpdateQuery<Reservation>,
  options: QueryOptions,
) {
  return await ReservationModel.findOneAndUpdate(filter, update, options)
}

async function deleteReservation(filter: FilterQuery<Reservation>) {
  const reservation = await ReservationModel.findOne(filter)
  if (!reservation) throw new Error('Reservation not found')

  const renter = await findUser({ _id: reservation.renter })
  const customer = await findUser({ _id: reservation.customer.id })

  if (!customer || !renter) throw new Error('Reservation not found')

  await renter.removeReservation(reservation._id)
  await customer.removeReservation(reservation._id)

  return await ReservationModel.findOneAndDelete(filter)
}

export { createReservation, updateReservationStatus, updateReservation, deleteReservation }
