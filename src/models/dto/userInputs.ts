import mongoose from 'mongoose'

interface AuthDetails {
  email: string
  password: string
}

interface Auth extends AuthDetails, mongoose.Document {
  comparePassword(password: string): Promise<boolean>
}

interface SignUpDetails {
  profilePicture: string
  name: string
  age: number
  phoneNumber: string
  password: string
  email: string
  placeOfResidence: Location
  identificationCard: string
}

type Location = {
  lat: string
  long: string
}

export { Auth, SignUpDetails }
