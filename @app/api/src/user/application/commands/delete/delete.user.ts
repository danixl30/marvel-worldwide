import { ApplicationService } from 'src/core/application/service/application.service'
import { DeleteUserDTO } from './types/dto'
import { DeleteUserResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UserRepository } from '../../repositories/user.repository'
import { DeleteProfileCommand } from 'src/profile/application/commands/delete-profile/delete.profile.command'
import { Result } from 'src/core/application/result-handler/result.handler'

export class DeleteUserCommand
    implements
        ApplicationService<DeleteUserDTO, DeleteUserResponse, ApplicationError>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly deleteProfile: DeleteProfileCommand,
    ) {}

    async execute(
        data: DeleteUserDTO,
    ): Promise<Result<DeleteUserDTO, ApplicationError>> {
        const user = await this.userRepository.getById(data.id)
        if (!user) throw new Error('User not found')
        const results = await user.profiles.asyncMap((e) =>
            this.deleteProfile.execute({
                id: e.value,
            }),
        )
        results.map((e) => e.unwrap())
        await this.userRepository.delete(data.id)
        return Result.success({
            id: data.id,
        })
    }
}
