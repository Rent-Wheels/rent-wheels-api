import fs from 'fs'
import multer from 'multer'
import { Request } from 'express'
import { v4 as uuid } from 'uuid'

import { MulterCarInput } from '../../schema/car.schema'
import { CreateUserInput } from '../../schema/user.schema'

type FileNameCallBack = (error: Error | null, fileName: string) => void
type DestinationCallBack = (error: Error | null, destination: string) => void

const userFileStorage = multer.diskStorage({
  destination: async (
    req: Request<any, any, CreateUserInput['body']>,
    _file: Express.Multer.File,
    callback: DestinationCallBack,
  ) => {
    const path = `./tmp/users/${req.body.userId}`
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
    callback(null, path)
  },
  filename: (_req: Request, file: Express.Multer.File, callback: FileNameCallBack) => {
    const withoutName = file.originalname.split('.')
    callback(null, uuid() + '.' + withoutName[withoutName.length - 1])
  },
})

const carFileStorage = multer.diskStorage({
  destination: (
    req: Request<MulterCarInput['params'], any, MulterCarInput['body']>,
    _file: Express.Multer.File,
    callback: DestinationCallBack,
  ) => {
    let carId = uuid()
    if (req.body.carId) carId = req.body.carId
    else if (req.params.carId) carId = req.params.carId as string

    const filePath = `./tmp/cars/${req.body.owner}/${carId}/`

    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true })

    if (!req.body.carId) req.body.carId = carId
    callback(null, filePath)
  },
  filename: (_req: Request, file: Express.Multer.File, callback: FileNameCallBack) => {
    const withoutName = file.originalname.split('.')
    callback(null, uuid() + '.' + withoutName[withoutName.length - 1])
  },
})

export { userFileStorage, carFileStorage }
