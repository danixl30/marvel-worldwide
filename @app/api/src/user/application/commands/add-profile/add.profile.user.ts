import { ApplicationService } from 'src/core/application/service/application.service'
import { AddProfileDTO } from './types/dto'
import { AddProfileResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UserRepository } from '../../repositories/user.repository'
import { CreateProfileCommand } from 'src/profile/application/commands/create-profile/create.profile.command'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class AddProfileCommand
    implements
        ApplicationService<AddProfileDTO, AddProfileResponse, ApplicationError>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createProfile: CreateProfileCommand,
    ) {}

    async execute(
        data: AddProfileDTO,
    ): Promise<Result<AddProfileResponse, ApplicationError>> {
        const user = await this.userRepository.getById(data.userId)
        if (!user) throw new Error('User not found')
        if (user.profiles.length >= 5) throw new Error('Max profiles created')
        const result = await this.createProfile.execute(data)
        const profile = result.unwrap()
        user.profiles.push(new ProfileId(profile.id))
        await this.userRepository.save(user)
        return Result.success({
            ...profile,
            userId: data.userId,
        })
    }
}
