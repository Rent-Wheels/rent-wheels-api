import { mongoConnect } from './mongo'

import { MediaCategory } from '../models/enums'
import imageCompressor from './image-compressor'
import videoCompressor from './video-compressor'
import { imageMimeTypes } from '../models/mimeTypes'

process.on(
  'message',
  async ({
    file,
    compressedPath,
    id,
    category,
  }: {
    file: Express.Multer.File
    compressedPath: string
    id: string
    category: MediaCategory
  }) => {
    console.log('Compression Starting...')
    await mongoConnect()

    if (imageMimeTypes.includes(file.mimetype)) {
      await imageCompressor(id, compressedPath, category, file)
    } else {
      await videoCompressor(file, compressedPath, id)
    }

    process.exit()
  },
)
