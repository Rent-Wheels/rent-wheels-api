import mongoose from 'mongoose'

import { Availability, CarType, Condition, Plan, Roles } from '../enums'

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

interface CarDetails extends mongoose.Document {
  owner: string
  make: string
  model: string
  capacity: number
  yearOfManufacture: string
  registrationNumber: string
  condition: Condition
  rate: number
  plan: Plan
  type: CarType
  availability: Availability
  rentalHistory: Reservation[]
  maxDuration: number
  description: string
  terms: string
}

type Location = {
  lat: string
  long: string
}

type Reservation = {
  reservationId: string
}

export { Auth, SignUpDetails, UserDetails, CarDetails }
