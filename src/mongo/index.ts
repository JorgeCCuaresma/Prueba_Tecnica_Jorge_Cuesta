import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const url: string = process.env.URL_DATABASE as string
export const connectDB = async (): Promise<void> => {
  mongoose.connect(url)
    .then(() => {
      console.log('Connected to database ✅')
    })
    .catch((error) => {
      console.error('Error connecting to database: ', error)
    })
}
