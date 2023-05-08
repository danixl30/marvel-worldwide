import { User } from 'src/user/model/user'

export type GetUserByIdResponse = Omit<User, 'password'>
