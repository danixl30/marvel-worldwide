import { ApplicationService } from 'src/core/application/service/application.service'
import { GetCivilByIdDTO } from './types/dto'
import { GetCivilByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilRepository } from '../../repositories/civil.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { CivilNotFoundError } from '../../exceptions/civil.not.found'

export class GetCivilByIdQuery
    implements
        ApplicationService<
            GetCivilByIdDTO,
            GetCivilByIdResponse,
            ApplicationError
        >
{
    constructor(private readonly civilRepository: CivilRepository) {}

    async execute(
        data: GetCivilByIdDTO,
    ): Promise<Result<GetCivilByIdResponse, ApplicationError>> {
        const civil = await this.civilRepository.getById(new CivilId(data.id))
        if (!civil) return Result.error(new CivilNotFoundError())
        await this.civilRepository.delete(civil)
        return Result.success({
            id: data.id,
            person: {
                name: civil.person.name.firstName,
                lastName: civil.person.name.lastName,
                gender: civil.person.gender.value,
                maritialStatus: civil.person.maritialStatus.value,
                hairColor: civil.person.hair.value,
                eyesColor: civil.person.eye.value,
                occupations: civil.person.occupations.map((e) => e.value),
                nationalities: civil.person.nationalites.map((e) => e.value),
            },
            relation: {
                target: civil.relation.targetId,
                kind: civil.relation.kind,
            },
        })
    }
}
