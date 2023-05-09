import { Schema, model } from 'mongoose'
import { IUser } from '../types'
import bcrypt from 'bcryptjs'

const userSchema = new Schema<IUser>({
  name: { type: String, minlength: 3 },
  surname: { type: String, minlength: 3 },
  email: { type: String, unique: true, qrequired: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
  phone: { type: Number, required: true, minlength: 9, maxlength: 9 },
  password: { type: String, required: true, minlength: 8, match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ }
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  this.password = hash
  next()
})

export const User = model<IUser>('User', userSchema)
