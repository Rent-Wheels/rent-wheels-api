import { TypeOf, date, nativeEnum, object, string } from 'zod'

import { ReservationStatus } from '../models/enums'

const reservationSchema = {
  body: object({
    customer: object({
      id: string({
        required_error: 'Customer Id is required',
      }),
      name: string({
        required_error: 'Customer Name is required',
      }),
    }),
    renter: string({
      required_error: 'Renter Id is required',
    }),
    car: string({
      required_error: 'Car Id is required',
    }),
    startDate: date({
      required_error: 'Start Date is required',
    }),
    returnDate: date({
      required_error: 'Return Date is required',
    }),
    status: nativeEnum(ReservationStatus, {
      required_error: 'Reservation Status is required',
    }),
  }),
}

const params = {
  params: object({
    reservationId: string({
      required_error: 'Reservation id required',
    }),
  }),
}

const createReservationSchema = object({
  ...reservationSchema,
})

const updateReservationSchema = object({
  ...reservationSchema,
  ...params,
})

const deleteReservationSchema = object({
  ...params,
})

type CreateReservationInput = TypeOf<typeof createReservationSchema>
type UpdateReservationInput = TypeOf<typeof updateReservationSchema>
type DeleteReservationInput = TypeOf<typeof deleteReservationSchema>

export {
  createReservationSchema,
  updateReservationSchema,
  deleteReservationSchema,
  CreateReservationInput,
  UpdateReservationInput,
  DeleteReservationInput,
}
