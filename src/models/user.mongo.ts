import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  profilePicture: String,
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
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
  cars: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Car',
    },
  ],
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
