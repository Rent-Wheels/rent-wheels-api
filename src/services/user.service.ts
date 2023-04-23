import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

import UserModel from '../models/user.mongo'
import { User } from '../models/dto/userInputs'

async function createUser(userDetails: User) {
  try {
    const user = await UserModel.create(userDetails)

    return user.toJSON()
  } catch (e: any) {
    throw new Error(e)
  }
}

async function updateUser(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions,
) {
  try {
    return await UserModel.findOneAndUpdate(query, update, options)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function findUser(query: FilterQuery<User>) {
  return await UserModel.findOne(query)
}

export { createUser, updateUser, findUser }
