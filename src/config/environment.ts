import { join } from 'path'

export const getMongoUrl = () => {
  console.log(process.env.MONG_URI)
  return process.env.MONGO_URI
}
export const rootPublicPath = join(__dirname, '../../', 'file')
