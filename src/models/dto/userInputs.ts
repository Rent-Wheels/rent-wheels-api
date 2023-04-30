import mongoose from 'mongoose'

import { Availability, CarType, Condition, Plan, ReservationStatus, Roles } from '../enums'

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
  age: number
  identificationCard: string
  reservations: Reservation['_id'][]
  cars?: Car['_id'][]
}
interface User extends UserInput, mongoose.Document {
  addCar(carId: string): Promise<User>
  removeCar(carId: string): Promise<User>
  addReservation(reservationId: string): Promise<User>
  removeReservation(reservationId: string): Promise<User>
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
  rentalHistory?: Reservation['_id'][]
  maxDuration: number
  description: string
  terms: string
}

interface ReservationDetails {
  customer: {
    id: User['_id']
    name: User['name']
  }
  renter: Car['owner']
  car: Car['_id']
  startDate: Date
  returnDate: Date
  status: ReservationStatus
}

interface Reservation extends ReservationDetails, mongoose.Document {
  updateStatus(status: ReservationStatus): Promise<Reservation>
}

type Location = {
  lat: string
  long: string
}

export { Auth, User, Session, Car, Reservation }
