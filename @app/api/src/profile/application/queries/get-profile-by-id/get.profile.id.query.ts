import { ApplicationService } from 'src/core/application/service/application.service'
import { GetProfileByIdDTO } from './types/dto'
import { GetProfileByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileRepository } from '../../repositories/profile.repository'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { ProfileNotFoundError } from '../../errors/profile.not.found'

export class GetProfileByIdQuery
    implements
        ApplicationService<
            GetProfileByIdDTO,
            GetProfileByIdResponse,
            ApplicationError
        >
{
    constructor(private readonly profileRepository: ProfileRepository) {}
    async execute(
        data: GetProfileByIdDTO,
    ): Promise<Result<GetProfileByIdResponse, ApplicationError>> {
        const profile = await this.profileRepository.getById(
            new ProfileId(data.id),
        )
        if (!profile) return Result.error(new ProfileNotFoundError())
        return Result.success({
            id: profile.id.value,
            language: profile.language.value,
            email: profile.email.value,
            history: profile.history.map((e) => ({
                id: e.id.value,
                targetId: e.target.postId,
            })),
            preferences: profile.preferences.map((e) => ({
                id: e.id.value,
                kind: e.target.kind,
                platform: e.target.platform,
            })),
            rates: profile.rates.map((e) => ({
                id: e.id.value,
                kind: e.kind.value,
                calification: e.calification.value,
            })),
        })
    }
}
