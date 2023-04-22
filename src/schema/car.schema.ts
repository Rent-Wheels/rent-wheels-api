import { TypeOf, array, nativeEnum, number, object, string } from 'zod'

import { Availability, CarType, Condition, Plan } from '../models/enums'

const carSchema = {
  carDetails: object({
    owner: string({
      required_error: 'Owner Id required',
    }),
    make: string({
      required_error: 'Make is required',
    }),
    model: string({
      required_error: 'Model is required',
    }),
    capacity: number({
      required_error: 'Capacity of car required',
    }),
    yearOfManufacture: string({
      required_error: 'Year of manufacture is required',
    }),
    registrationNumber: string({
      required_error: 'Registration number is required',
    }),
    condition: nativeEnum(Condition, {
      required_error: 'Condition of the car is required',
    }),
    rate: number({
      required_error: 'Rate of rental is required',
    }),
    plan: nativeEnum(Plan, {
      required_error: 'Rental plan is required',
    }),
    type: nativeEnum(CarType, {
      required_error: 'Car type is required',
    }),
    availability: nativeEnum(Availability, {
      required_error: 'Availability of the car is required',
    }),
    rentalHistory: array(string()).optional(),
    maxDuration: number({
      required_error: 'The maximum duration is required',
    }),
    description: string({
      required_error: 'Description required',
    }),
    terms: string({
      required_error: 'Terms of the rental is required',
    }),
  }),
}

const params = {
  params: object({
    carId: string({
      required_error: 'Car id required',
    }),
  }),
}

const createCarSchema = object({
  ...carSchema,
})

const updateCarSchema = object({
  ...carSchema,
  ...params,
})

type CreateCarInput = TypeOf<typeof createCarSchema>
type UpdateCarInput = TypeOf<typeof updateCarSchema>

export { createCarSchema, updateCarSchema, CreateCarInput, UpdateCarInput }
