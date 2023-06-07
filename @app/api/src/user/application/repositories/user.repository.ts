import { Optional } from '@mono/types-utils'
import { User } from 'src/user/model/user'

export interface UserRepository {
    save(user: User): Promise<void>
    getById(id: string): Promise<Optional<User>>
    delete(id: string): Promise<void>
    getByEmail(email: string): Promise<Optional<User>>
}
