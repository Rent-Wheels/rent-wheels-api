import imageCompressor from './image-compressor'
import { mongoConnect } from './mongo'

process.on(
  'message',
  async ({
    image,
    compressedPath,
    userId,
  }: {
    image: Express.Multer.File
    compressedPath: string
    userId: string
  }) => {
    console.log('Compression Starting...')
    await mongoConnect()

    await imageCompressor(image, compressedPath, userId)
    process.exit()
  },
)
