import mongoose from 'mongoose'

import { Roles } from '../enums'

interface AuthDetails {
  email: string
  password: string
}

interface Auth extends AuthDetails, mongoose.Document {
  comparePassword(password: string): Promise<boolean>
}

interface SignUpDetails {
  dob: Date
  role: Roles
  name: string
  email: string
  password: string
  phoneNumber: string
  profilePicture: string
  identificationCard: string
  placeOfResidence: Location
}

interface UserDetails {
  dob: Date
  id: string
  name: string
  email: string
  phoneNumber: string
  profilePicture: string
  placeOfResidence: Location
}

type Location = {
  lat: string
  long: string
}

export { Auth, SignUpDetails, UserDetails }
