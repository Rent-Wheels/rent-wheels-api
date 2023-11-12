import { CarType, Condition, DurationUnit, Plan, ReservationStatus, Roles } from '../enums'

type Media = {
  id: string
  mediaURL: string
}

interface User {
  id?: string
  dob: Date
  email: string
  name: string
  phoneNumber: string
  placeOfResidence: string
  profilePicture: string
  role: Roles
  userId: string
}

interface Reservation {
  id?: string
  carId: string
  customerId: string
  renterId: string
  destination: string
  price: number
  returnDate: string
  startDate: string
  status: ReservationStatus
}

interface Car {
  id?: string
  make: string
  model: string
  yearOfManufacture: string
  registrationNumber: string
  color: string
  capacity: number
  type: CarType
  location: string
  condition: Condition
  description: string
  terms: string
  ownerId: string
  maxDuration: number
  rate: number
  plan: Plan
  availability: boolean
  media: Media[]
  durationUnit: DurationUnit
}

export { User, Car, Reservation }
