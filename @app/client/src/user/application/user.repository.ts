import { CreateUserDTO } from './services/dto/create.user.dto'
import { LoginDTO } from './services/dto/login'
import { User } from './services/dto/user'

export type UserRepository = {
    create(data: CreateUserDTO): Promise<void>
    login(data: LoginDTO): Promise<void>
    delete(): Promise<void>
    getDetails(): Promise<User>
}
