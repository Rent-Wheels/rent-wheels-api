import { TypeOf, array, coerce, nativeEnum, object, optional, string } from 'zod'

import { Roles } from '../models/enums'

const userSchema = {
  body: object({
    userId: string({
      required_error: 'UserId is required',
    }),
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
    profilePicture: string({
      required_error: 'Profile picture is required',
    }),
    placeOfResidence: string({
      required_error: 'Place of residence is required',
    }),
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
  ...userSchema,
})

const updateUserSchema = object({
  ...params,
  ...userSchema,
})

const upgradeUserSchema = object({
  ...params,
})

const deleteUserSchema = object({
  ...params,
})

const getUserSchema = object({
  ...params,
})

const getUserReservationHistorySchema = object({
  ...params,
})

const clearUserReservationHistorySchema = object({
  ...params,
})

type GetUserInput = TypeOf<typeof getUserSchema>
type CreateUserInput = TypeOf<typeof createUserSchema>
type UpdateUserInput = TypeOf<typeof updateUserSchema>
type DeleteUserInput = TypeOf<typeof deleteUserSchema>
type UpgradeUserInput = TypeOf<typeof upgradeUserSchema>
type GetUserReservationHistoryInput = TypeOf<typeof getUserReservationHistorySchema>
type ClearUserReservationHistoryInput = TypeOf<typeof clearUserReservationHistorySchema>

export {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
  upgradeUserSchema,
  getUserReservationHistorySchema,
  clearUserReservationHistorySchema,
  GetUserInput,
  CreateUserInput,
  UpdateUserInput,
  DeleteUserInput,
  UpgradeUserInput,
  GetUserReservationHistoryInput,
  ClearUserReservationHistoryInput,
}
