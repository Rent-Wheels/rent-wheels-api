import { mongoConnect } from './mongo'

import imageCompressor from './image-compressor'
import videoCompressor from './video-compressor'
import { imageMimeTypes } from '../models/mimeTypes'
import { MediaCategory } from '../models/enums'

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
    await mongoConnect()
    console.log('Compression Starting...')

    if (imageMimeTypes.includes(file.mimetype)) {
      await imageCompressor(id, compressedPath, category, file)
    } else {
      await videoCompressor(file, compressedPath, id)
    }

    process.exit()
  },
)
