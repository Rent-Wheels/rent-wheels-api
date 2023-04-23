import mongoose from 'mongoose'

import { Availability, CarType, Condition, Plan, Roles } from '../enums'

interface AuthDetails {
  email: string
  password: string
}

interface Auth extends AuthDetails, mongoose.Document {
  comparePassword(password: string): Promise<boolean>
}

interface UserInput {
  dob: Date
  name: string
  email: string
  password?: string
  phoneNumber: string
  profilePicture: string
  placeOfResidence: Location
  role: Roles
  identificationCard: string
  reservations: string[]
  cars?: Car['_id'][]
}
interface User extends UserInput, mongoose.Document {
  addCar(carId: string): User
  removeCar(carId: string): User
}

interface Session extends mongoose.Document {
  user: User['_id']
  valid: boolean
  createdAt: Date
  updatedAt: Date
}

interface Car extends mongoose.Document {
  owner: User['_id']
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
  location: string
  rentalHistory?: Reservation[]
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

export { Auth, User, Session, Car }
