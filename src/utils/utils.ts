import jwt from 'jsonwebtoken'
import { IUser } from '../types'
import bcrypt from 'bcryptjs'

const secret = process.env.JWT_SECRET as string
export const generateJWT = (user: IUser): string => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: '30 days'
  })

  return token
}

export const comparePassword = (user: IUser, password: string): boolean => {
  return bcrypt.compareSync(password, user.password)
}
