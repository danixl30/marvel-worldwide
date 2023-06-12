import { UserTypes } from 'src/user/model/user'

export type CreateUserDTO = {
    email: string
    password: string
    type: UserTypes
    cardNumber: string
    birthDate: Date
}
