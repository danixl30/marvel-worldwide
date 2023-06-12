import { ApplicationService } from '../../../core/application/service/application-service'
import { UserRepository } from '../user.repository'

export const DeleteUserService = (
    userRepository: UserRepository,
): ApplicationService<undefined, void> => {
    const execute = () => userRepository.delete()
    return {
        execute,
    }
}
