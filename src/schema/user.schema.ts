import { TypeOf, array, coerce, nativeEnum, object, optional, string } from 'zod'

import { Roles } from '../models/enums'

const authSchema = {
  body: object({
    email: string({
      required_error: 'Please enter a valid email address',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Please enter a password',
    }).min(5, 'Password must be at least 5 characters long'),
  }),
}

const userSchema = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Please enter a valid email address',
    }).email('Invalid email address'),
    dob: coerce.date({
      required_error: 'Date of birth is required',
    }),
    phoneNumber: string({
      required_error: 'Phone number required',
    }),
    profilePicture: string().optional(),
    placeOfResidence: object({
      lat: string(),
      long: string(),
    }).optional(),
    role: nativeEnum(Roles).optional(),
    identificationCard: string().optional(),
    reservations: optional(array(string())),
    cars: array(string()).optional(),
  }),
}

const params = {
  params: object({
    userId: string({
      required_error: 'User id required',
    }),
  }),
}

const createUserSchema = object({
  ...authSchema,
  ...userSchema,
})

const loginSchema = object({
  ...authSchema,
})

const updateUserSchema = object({
  ...params,
  ...userSchema,
})

type CreateUserInput = TypeOf<typeof createUserSchema>
type LoginInput = TypeOf<typeof loginSchema>
type UpdateUserInput = TypeOf<typeof updateUserSchema>

export {
  createUserSchema,
  loginSchema,
  updateUserSchema,
  CreateUserInput,
  LoginInput,
  UpdateUserInput,
}
