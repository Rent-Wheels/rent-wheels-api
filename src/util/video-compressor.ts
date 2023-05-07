import ffmpeg from 'fluent-ffmpeg'
import { updateCarMedia } from '../services/car.service'

export default async function videoCompressor(
  file: Express.Multer.File,
  compressedPath: string,
  carId: string,
) {
  const withoutEXT = file.path.split('.')[0]

  const finalPath = `${compressedPath}/${withoutEXT}.mp4`

  ffmpeg(file.path)
    .videoCodec('libx265')
    .audioBitrate(128)
    .output('mp4')
    .on('end', async () => {
      await updateCarMedia({ carId }, file.path, finalPath)
    })
    .on('error', e => {
      console.log(e)
    })
    .save(finalPath)
}
