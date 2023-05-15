import { ApplicationService } from 'src/core/application/service/application.service'
import { GetProfilesDTO } from './types/dto'
import { GetProfilesResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UserRepository } from '../../repositories/user.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetProfileByIdQuery } from 'src/profile/application/queries/get-profile-by-id/get.profile.id.query'

export class GetProfilesQuery
    implements
        ApplicationService<
            GetProfilesDTO,
            GetProfilesResponse,
            ApplicationError
        >
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly getProfile: GetProfileByIdQuery,
    ) {}

    async execute(
        data: GetProfilesDTO,
    ): Promise<Result<GetProfilesResponse, ApplicationError>> {
        const user = await this.userRepository.getById(data.userId)
        if (!user) throw new Error('User not found')
        const result = await user.profiles.asyncMap((profile) =>
            this.getProfile.execute({
                id: profile.value,
            }),
        )
        const profiles = result.map((e) => e.unwrap())
        return Result.success(
            profiles.map((profile) => ({
                id: profile.id,
                email: profile.email,
                language: profile.language,
            })),
        )
    }
}
