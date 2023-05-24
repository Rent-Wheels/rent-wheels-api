import { MediaCategory } from './src/models/enums'
import imageCompressor from './src/util/imageCompressor'
import videoCompressor from './src/util/videoCompressor'
import { imageMimeTypes } from './src/models/mimeTypes'

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

    if (imageMimeTypes.includes(file.mimetype)) {
      await imageCompressor(id, compressedPath, category, file)
    } else {
      console.log('video compressing')

      await videoCompressor(file, compressedPath, id)
    }
  },
)
