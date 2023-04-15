import mongoose from 'mongoose'
import { CarDetails } from './dto/userInputs'

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  yearOfManufacture: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  rentalHistory: [
    {
      reservationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Reservation',
      },
      default: [],
    },
  ],
  maxDuration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
})

const CarModel = mongoose.model<CarDetails>('Car', carSchema)

export default CarModel
