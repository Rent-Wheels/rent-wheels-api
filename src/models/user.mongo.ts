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
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  placeOfResidence: {
    lat: String,
    long: String,
  },
  identificationCard: String,
  reservations: [mongoose.Types.ObjectId],
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
