import mongoose from 'mongoose'

import { Reservation } from './dto/userInputs'

const reservationSchema = new mongoose.Schema({
  customer: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    required: true,
  },
  renter: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Renter',
  },
  car: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Car',
  },
  startDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const ReservationModel = mongoose.model<Reservation>('Reservation', reservationSchema)

export default ReservationModel
