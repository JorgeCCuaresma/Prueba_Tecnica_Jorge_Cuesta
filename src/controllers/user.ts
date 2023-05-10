import { Request, Response } from 'express'
import { User } from '../models/user'
import { IUser } from '../types'
import { comparePassword, generateJWT } from '../utils/utils'
import bcrypt from 'bcryptjs'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: IUser = req.body
    const user = new User(body)
    const userExist = await User.findOne({ email: body.email })
    if (userExist !== null) { res.status(400).json({ msg: 'User with this email already exists' }); return }

    if (body.name.length < 3) { res.status(400).json({ msg: 'Name must be at least 3 characters long' }); return }

    if (body.surname.length < 3) { res.status(400).json({ msg: 'Surname must be at least 3 characters long' }); return }

    if (typeof body.email === 'undefined' || body.email.length === 0) { res.status(400).json({ msg: 'The email field is required' }); return }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(body.email)) { res.status(400).json({ msg: 'Please enter a valid email address' }); return }

    if (!/^[0-9]+$/.test(body.phone.toString())) { res.status(400).json({ msg: 'The phone field can only contain numbers' }); return }

    if (typeof body.phone === 'undefined' || body.phone.toString().length === 0) { res.status(400).json({ msg: 'The phone field is required' }); return }

    if (body.phone.toString().length !== 9) { res.status(400).json({ msg: 'The phone field must be 9 digits long' }); return }

    if (typeof body.password === 'undefined' || body.password.length === 0) { res.status(400).json({ msg: 'The password field is required' }); return }

    if (body.password.length < 8) { res.status(400).json({ msg: 'The password must be at least 8 characters long' }); return }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) { res.status(400).json({ msg: 'Password must contain at least one lowercase letter, one uppercase letter and one number' }); return }

    if (typeof body.repeatPassword === 'undefined' || body.repeatPassword.length === 0) { res.status(400).json({ msg: 'The repeat password field is required' }); return }

    if (body.repeatPassword.length < 8) { res.status(400).json({ msg: 'The repeat password must be at least 8 characters long' }); return }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.repeatPassword)) { res.status(400).json({ msg: 'Repeat password must contain at least one lowercase letter, one uppercase letter and one number' }); return }

    if (body.password !== body.repeatPassword) { res.status(400).json({ msg: 'Password fields do not match' }); return }

    const userSave = await user.save()

    const token = generateJWT(userSave)

    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as IUser
  try {
    if (typeof email === 'undefined' || email.length === 0) { res.status(400).json({ msg: 'The email field is required' }); return }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) { res.status(400).json({ msg: 'Please enter a valid email address' }); return }
    const user = await User.findOne({ email })
    if (user === null) { res.status(400).json({ msg: 'The email is not correct' }) }
    if (user != null) {
      const permiss = comparePassword(user, password)
      if (!permiss) { res.status(400).json({ msg: 'The password is not correct' }) }
      const token = generateJWT(user)
      const userToSend = {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone
      }
      res.status(200).json({ token, user: userToSend })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (user === null) { res.status(404).json({ msg: 'User not found' }); return }
    const userToSend = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone
    }
    res.status(200).json(userToSend)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  const body: IUser = req.body
  try {
    if (id !== res.locals.auth._id) { res.status(401).json({ msg: 'Unauthorized this is not your user' }); return }

    const userExist = await User.findOne({ email: body.email })
    if (userExist !== null) { res.status(400).json({ msg: 'User with this email already exists' }); return }

    if (body.name !== undefined && body.name.length < 3) { res.status(400).json({ msg: 'Name must be at least 3 characters long' }); return }

    if (body.surname !== undefined && body.surname.length < 3) { res.status(400).json({ msg: 'Surname must be at least 3 characters long' }); return }

    if (body.email !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(body.email)) { res.status(400).json({ msg: 'Please enter a valid email address' }); return }

    if (body.phone !== undefined && !/^[0-9]+$/.test(body.phone.toString())) { res.status(400).json({ msg: 'The phone field can only contain numbers' }); return }

    if (body.phone !== undefined && body.phone.toString().length !== 9) { res.status(400).json({ msg: 'The phone field must be 9 digits long' }); return }

    if (body.password !== undefined && body.password.length < 8) { res.status(400).json({ msg: 'The password must be at least 8 characters long' }); return }

    if (body.password !== undefined && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) { res.status(400).json({ msg: 'Password must contain at least one lowercase letter, one uppercase letter and one number' }); return }

    if (body.repeatPassword !== body.password) { res.status(400).json({ msg: 'Password fields do not match' }); return }

    if (body.password !== undefined) { body.password = await bcrypt.hash(body.password, 10) }
    const user = await User.findByIdAndUpdate(id, body)

    if (user === null) { res.status(404).json({ msg: 'User not found' }); return }

    const userModified = await User.findById(id)

    let userToSend
    if (userModified !== null) {
      userToSend = {
        _id: userModified._id,
        name: userModified.name,
        surname: userModified.surname,
        email: userModified.email,
        phone: userModified.phone
      }
    }
    res.status(200).json({ userToSend })
  } catch (error) {
    res.status(500).send(error)
  }
}
