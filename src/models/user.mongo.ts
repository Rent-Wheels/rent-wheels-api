import mongoose from 'mongoose'

import { User } from './dto/userInputs'

const userSchema = new mongoose.Schema({
  profilePicture: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  placeOfResidence: {
    lat: String,
    long: String,
  },
  role: {
    type: Number,
    required: true,
  },
  identificationCard: String,
  reservations: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Reservation',
    },
  ],
  cars: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Car',
      },
    ],
    default: undefined,
  },
})

userSchema.methods.addCar = function (carId: string) {
  const user = this as User
  user.cars?.push(carId)
  return user
}

const UserModel = mongoose.model<User>('User', userSchema)

export default UserModel
