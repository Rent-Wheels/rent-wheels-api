import { TypeOf, coerce, nativeEnum, number, object, string } from 'zod'

import { ReservationStatus } from '../models/enums'

const reservationSchema = {
  body: object({
    customerId: string({
      required_error: 'Customer Id is required',
    }),
    renterId: string({
      required_error: 'Renter Id is required',
    }),
    destination: string({
      required_error: 'Destination is required',
    }),
    carId: string({
      required_error: 'Car Id is required',
    }),
    price: number({
      required_error: 'Price is required',
    }),
    startDate: coerce.date({
      required_error: 'Start Date is required',
    }),
    returnDate: coerce.date({
      required_error: 'Return Date is required',
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

const userParams = {
  query: object({
    userId: string({}).optional(),
    renterId: string({}).optional(),
  }),
}

const createReservationSchema = object({
  ...reservationSchema,
})

const updateReservationSchema = object({
  ...reservationSchema,
  ...params,
})

const updateReservationStatusSchema = object({
  ...params,
  body: object({
    status: nativeEnum(ReservationStatus, {
      required_error: 'Reservation status is required',
    }),
  }),
})

const deleteReservationSchema = object({
  ...params,
})

const getUserReservationSchema = object({
  ...userParams,
})

type CreateReservationInput = TypeOf<typeof createReservationSchema>
type UpdateReservationInput = TypeOf<typeof updateReservationSchema>
type DeleteReservationInput = TypeOf<typeof deleteReservationSchema>
type GetUserReservationInput = TypeOf<typeof getUserReservationSchema>
type UpdateReservationStatusInput = TypeOf<typeof updateReservationStatusSchema>

export {
  createReservationSchema,
  updateReservationSchema,
  deleteReservationSchema,
  getUserReservationSchema,
  updateReservationStatusSchema,
  CreateReservationInput,
  UpdateReservationInput,
  DeleteReservationInput,
  GetUserReservationInput,
  UpdateReservationStatusInput,
}
