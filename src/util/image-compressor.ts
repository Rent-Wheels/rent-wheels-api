import fs from 'fs'
import compressImage from 'compress-image'
import { updateProfilePicture } from '../services/user.service'

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
    await imageCompressor(image, compressedPath, userId)
  },
)

async function imageCompressor(image: Express.Multer.File, compressedPath: string, userId: string) {
  fs.readFile(image.path, (e, data) => {
    if (e) throw e

    const filePath = image.path
    const compressedFilePath = compressedPath
    const compression = 60

    fs.writeFile(filePath, data, async e => {
      if (e) throw e

      process.send?.('continue')

      compressImage(
        filePath,
        compressedFilePath,
        // @ts-ignore
        { compress_force: false, autoupdate: true },
        // @ts-ignore
        false,
        // @ts-ignore
        { jpg: { engine: 'mozjpeg', command: ['-quality', compression] } },
        (e: Error, completed: boolean) => {
          if (!e && completed) {
            fs.unlink(filePath, e => {
              if (e) throw e
            })
          }
        },
      )
    })
  })
  await updateUserImage(userId, compressedPath)
  process.exit()
}

async function updateUserImage(userId: string, filePath: string) {
  await updateProfilePicture(userId, filePath)
}
