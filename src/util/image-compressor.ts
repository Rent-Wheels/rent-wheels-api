// import fs from 'fs'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'

import { updateProfilePicture } from '../services/user.service'
import { deleteFolder } from './deleteFromStorage'

export default async function imageCompressor(
  image: Express.Multer.File,
  compressedPath: string,
  userId: string,
) {
  const filePath = image.path
  const compressedFilePath = compressedPath
  const compression = 60

  process.send?.('continue')

  const file = await imagemin([filePath], {
    destination: compressedFilePath,
    plugins: [
      imageminMozjpeg({
        quality: compression,
      }),
    ],
  })

  deleteFolder(`tmp/${userId}/images`)
  await updateProfilePicture(userId, file[0].destinationPath)
}
