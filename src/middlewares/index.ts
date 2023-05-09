import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET as string

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (authHeader === undefined) { res.status(401).json({ msg: 'Unauthorized missing header' }); return }
  const token = authHeader.split(' ')[1]

  if (token === undefined) { res.status(401).json({ error: 'Unauthorized missing token' }); return }

  try {
    if (token !== undefined) res.locals.auth = jwt.verify(token, jwtSecret)
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized token no valid' })
    return
  }

  next()
}
