import { Request, Response } from 'express'

import log from '../util/logger'
import { Roles } from '../models/enums'
import { Reservation } from '../models/dto/userInputs'

import {
  createReservation,
  deleteReservation,
  updateReservation,
  getUserReservations,
  updateReservationStatus,
} from '../services/reservation.service'

import {
  CreateReservationInput,
  DeleteReservationInput,
  UpdateReservationInput,
  UpdateReservationStatusInput,
} from '../schema/reservation.schema'

async function createReservationHandler(
  req: Request<Record<never, never>, Record<never, never>, CreateReservationInput['body']>,
  res: Response,
) {
  try {
    const reservationDetails = req.body as Reservation
    const reservation = await createReservation(reservationDetails)

    return res.status(201).json(reservation)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(400)
  }
}

async function updateReservationStatusHandler(
  req: Request<
    UpdateReservationStatusInput['params'],
    Record<never, never>,
    UpdateReservationStatusInput['body']
  >,
  res: Response,
) {
  try {
    const status = req.body.status
    const reservationId = req.params.reservationId

    const updatedReservation = await updateReservationStatus({
      status,
      id: reservationId,
    })

    return res.status(200).json(updatedReservation)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(404)
  }
}

async function updateReservationHandler(
  req: Request<
    UpdateReservationInput['params'],
    Record<never, never>,
    UpdateReservationInput['body']
  >,
  res: Response,
) {
  try {
    const reservationDetails = req.body as Reservation
    const reservationId = req.params.reservationId

    const updatedReservation = await updateReservation({ id: reservationId, reservationDetails })

    return res.status(200).json(updatedReservation)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(404)
  }
}

async function getUserReservationsHandler(_req: Request, res: Response) {
  try {
    const { id } = res.locals.user

    const reservations =
      (await getUserReservations({ customerId: id })) ??
      (await getUserReservations({ renterId: id }))

    return res.status(200).json(reservations)
  } catch (e) {
    log.error(e)

    return res.sendStatus(404)
  }
}

async function deleteReservationHandler(
  req: Request<DeleteReservationInput['params'], Record<never, never>, Record<never, never>>,
  res: Response,
) {
  try {
    const { role, id } = res.locals.user
    const { reservationId } = req.params

    role === Roles.User
      ? await deleteReservation({ id: reservationId, customerId: id })
      : await deleteReservation({ id: reservationId, renterId: id })

    return res.sendStatus(200)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(404)
  }
}

export {
  createReservationHandler,
  updateReservationHandler,
  deleteReservationHandler,
  getUserReservationsHandler,
  updateReservationStatusHandler,
}
