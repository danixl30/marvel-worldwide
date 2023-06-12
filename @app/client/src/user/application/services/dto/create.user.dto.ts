import { UserTypes } from './user.types'

export type CreateUserDTO = {
    email: string
    password: string
    type: UserTypes
    cardNumber: string
    birthDate: Date
}
