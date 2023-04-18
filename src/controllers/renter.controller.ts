import { Request, Response } from 'express'

import { createAuth } from '../services/auth.service'
import { createRenter, getRenterCars } from '../services/renter.service'
import { SignUpDetails, Auth } from '../models/dto/userInputs'

async function createRenterHandler(req: Request, res: Response) {
  try {
    const signUpDetails = req.body as SignUpDetails

    const auth = await createAuth({
      email: signUpDetails.email,
      password: signUpDetails.password,
    } as Auth)

    if (!auth) throw new Error('Could not create user')

    const renter = await createRenter(signUpDetails)

    if (!renter) throw new Error('Could not create user')

    return res.status(201).json(renter)
  } catch (e: any) {
    console.log(e)

    return res.sendStatus(409)
  }
}

async function getRenterCarsHandler(req: Request, res: Response) {
  try {
    const cars = await getRenterCars(req.params.userId)

    return res.status(200).json(cars)
  } catch (e: any) {
    console.log(e)

    return res.status(404).json('User not found')
  }
}

export { createRenterHandler, getRenterCarsHandler }
