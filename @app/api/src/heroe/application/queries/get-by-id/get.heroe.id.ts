import { ApplicationService } from 'src/core/application/service/application.service'
import { GetHeroeByIdDTO } from './types/dto'
import { GetHeroeByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { HeroeNotFoundError } from '../../errors/heroe.not.found'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { VillainNotFoundError } from 'src/villain/application/errors/villain.not.found'

export class GetHeroeByIdQuery
    implements
        ApplicationService<
            GetHeroeByIdDTO,
            GetHeroeByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly heroeRepository: HeroeRepository,
        private readonly villainRepository: VillainRepository,
    ) {}

    async execute(
        data: GetHeroeByIdDTO,
    ): Promise<Result<GetHeroeByIdResponse, ApplicationError>> {
        const heroe = await this.heroeRepository.getById(new HeroeId(data.id))
        if (!heroe) return Result.error(new HeroeNotFoundError())
        const villain = await this.villainRepository.getById(
            new VillainId(heroe.archEnemy.value),
        )
        if (!villain) return Result.error(new VillainNotFoundError())
        return Result.success({
            id: data.id,
            person: {
                name: heroe.person.name.firstName,
                phrase: heroe.person.phrase.value,
                lastName: heroe.person.name.lastName,
                gender: heroe.person.gender.value,
                maritialStatus: heroe.person.maritialStatus.value,
                hairColor: heroe.person.hair.value,
                eyesColor: heroe.person.eye.value,
                occupations: heroe.person.occupations.map((e) => e.value),
                nationalities: heroe.person.nationalites.map((e) => e.value),
            },
            name: heroe.name.value,
            creator: {
                firstName: heroe.creator.firstName,
                lastName: heroe.creator.lastName,
            },
            archEnemy: {
                id: villain.id.value,
                name: villain.name.value,
            },
            objects: heroe.objects.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                description: e.description.value,
                material: e.material.value,
                kind: e.kind.value,
                creator: e.creator.value,
            })),
            powers: heroe.powers.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                description: e.description.value,
                type: e.type.value,
            })),
            logo: heroe.logo.value,
            colors: heroe.colors.map((e) => e.value),
        })
    }
}
