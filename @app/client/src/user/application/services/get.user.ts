import { ApplicationService } from '../../../core/application/service/application-service'
import { UserRepository } from '../user.repository'
import { User } from './dto/user'

export const getUserApplicationService = (
    userRepository: UserRepository,
): ApplicationService<undefined, User> => {
    const execute = () => userRepository.getDetails()

    return {
        execute,
    }
}
