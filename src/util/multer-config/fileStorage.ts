import fs from 'fs-extra'
import multer from 'multer'
import { Request } from 'express'

import { CreateCarInput } from '../../schema/car.schema'
import { CreateUserInput } from '../../schema/user.schema'
import { findUser } from '../../services/user.service'

type FileNameCallBack = (error: Error | null, fileName: string) => void
type DestinationCallBack = (error: Error | null, destination: string) => void

const userFileStorage = multer.diskStorage({
  destination: async (
    req: Request<any, any, CreateUserInput['body']>,
    _file: Express.Multer.File,
    callback: DestinationCallBack,
  ) => {
    const user = await findUser({ phoneNumber: req.body.phoneNumber })
    if (user) {
      callback(new Error('Phone number already exists'), '')
    } else {
      const path = `/uploads/users/${req.body.userId}/`
      fs.mkdirSync(path)
      callback(null, path)
    }
  },
  filename: (_req: Request, file: Express.Multer.File, callback: FileNameCallBack) => {
    callback(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const carFileStorage = multer.diskStorage({
  destination: (
    req: Request<any, any, CreateCarInput['body']>,
    _file: Express.Multer.File,
    callback: DestinationCallBack,
  ) => {
    const path = `/uploads/cars/${req.body.owner}/`
    fs.mkdirSync(path)
    callback(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, callback: FileNameCallBack) => {
    callback(null, new Date().toISOString() + '-' + file.originalname)
  },
})

export { userFileStorage, carFileStorage }
