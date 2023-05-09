export interface IUser {
  _id?: string
  name: string
  surname: string
  email: string
  phone: number
  password: string
  repeatPassword?: string
}
