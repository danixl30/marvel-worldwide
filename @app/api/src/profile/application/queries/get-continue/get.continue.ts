import { ApplicationService } from 'src/core/application/service/application.service'
import { GetContinueDTO } from './types/dto'
import { GetContinueResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { ProfileRepository } from '../../repositories/profile.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class GetContinueQuery
    implements
        ApplicationService<
            GetContinueDTO,
            GetContinueResponse,
            ApplicationError
        >
{
    constructor(private readonly profileRepository: ProfileRepository) {}

    async execute(
        data: GetContinueDTO,
    ): Promise<Result<GetContinueResponse, ApplicationError>> {
        const targets = await this.profileRepository.getTop10History(
            new ProfileId(data.id),
        )
        return Result.success(
            targets.map((target) => ({
                id: target.target.postId,
                kind: target.target.kind,
            })),
        )
    }
}
