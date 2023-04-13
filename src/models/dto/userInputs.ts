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
  email: string
  placeOfResidence: {
    lat: string
    long: string
  }
  identificationCard: string
}

export { Auth, SignUpDetails }
