import { ApplicationService } from 'src/core/application/service/application.service'
import { GetCivilByIdDTO } from './types/dto'
import { GetCivilByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilRepository } from '../../repositories/civil.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { CivilNotFoundError } from '../../exceptions/civil.not.found'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { CivilRelationship } from 'src/civil/domain/value-objects/relationship'

export class GetCivilByIdQuery
    implements
        ApplicationService<
            GetCivilByIdDTO,
            GetCivilByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly civilRepository: CivilRepository,
        private readonly heroeRepository,
        private readonly villainRepository: VillainRepository,
    ) {}

    private async getTarget(id: CivilRelationship) {
        const heroe = await this.heroeRepository.getById(
            new HeroeId(id.targetId),
        )
        if (heroe)
            return {
                target: heroe.id.value,
                kind: 'heroe',
                name: heroe.name.value,
            }
        const villain = await this.villainRepository.getById(
            new VillainId(id.targetId),
        )
        if (villain)
            return {
                target: villain.id.value,
                kind: 'villain',
                name: villain.name.value,
            }
        throw new Error('Target not found')
    }

    async execute(
        data: GetCivilByIdDTO,
    ): Promise<Result<GetCivilByIdResponse, ApplicationError>> {
        const civil = await this.civilRepository.getById(new CivilId(data.id))
        if (!civil) return Result.error(new CivilNotFoundError())
        return Result.success({
            id: data.id,
            person: {
                name: civil.person.name.firstName,
                phrase: civil.person.phrase.value,
                lastName: civil.person.name.lastName,
                gender: civil.person.gender.value,
                maritialStatus: civil.person.maritialStatus.value,
                hairColor: civil.person.hair.value,
                eyesColor: civil.person.eye.value,
                occupations: civil.person.occupations.map((e) => e.value),
                nationalities: civil.person.nationalites.map((e) => e.value),
            },
            relation: await this.getTarget(civil.relation),
        })
    }
}
