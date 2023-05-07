// import fs from 'fs'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'

import { updateProfilePicture } from '../services/user.service'
import { deleteFolder } from './deleteFromStorage'
import { MediaCategory } from '../models/enums'
import { updateCarMedia } from '../services/car.service'

export default async function imageCompressor(
  id: string,
  compressedPath: string,
  category: MediaCategory,
  image: Express.Multer.File,
) {
  const filePath = image.path
  const compressedFilePath = compressedPath
  const compression = 60

  const file = await imagemin([filePath], {
    destination: compressedFilePath,
    plugins: [
      imageminMozjpeg({
        quality: compression,
      }),
    ],
  })

  deleteFolder(`tmp/users/${id}/images`)
  await updateMedia(id, file[0].destinationPath, category, filePath)
}

async function updateMedia(id: string, mediaURL: string, category: MediaCategory, oldURL: string) {
  if (category === MediaCategory.User) await updateProfilePicture(id, mediaURL)
  else await updateCarMedia({ carId: id }, oldURL, mediaURL)
}
