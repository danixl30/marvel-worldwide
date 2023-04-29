import { ApplicationService } from 'src/core/application/service/application.service'
import { GetHeroeByIdDTO } from './types/dto'
import { GetHeroeByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { HeroeNotFoundError } from '../../errors/heroe.not.found'

export class GetHeroeByIdQuery
    implements
        ApplicationService<
            GetHeroeByIdDTO,
            GetHeroeByIdResponse,
            ApplicationError
        >
{
    constructor(private readonly heroeRepository: HeroeRepository) {}

    async execute(
        data: GetHeroeByIdDTO,
    ): Promise<Result<GetHeroeByIdResponse, ApplicationError>> {
        const heroe = await this.heroeRepository.getById(new HeroeId(data.id))
        if (!heroe) return Result.error(new HeroeNotFoundError())
        return Result.success({
            id: data.id,
            person: {
                name: heroe.person.name.firstName,
                lastName: heroe.person.name.lastName,
                gender: heroe.person.gender.value,
                maritialStatus: heroe.person.maritialStatus.value,
                hairColor: heroe.person.hair.value,
                eyesColor: heroe.person.eye.value,
                occupations: heroe.person.occupations.map((e) => e.value),
                nationalities: heroe.person.nationalites.map((e) => e.value),
            },
            name: heroe.name.value,
            phrase: heroe.phrase.value,
            creator: {
                firstName: heroe.creator.firstName,
                lastName: heroe.creator.lastName,
            },
            archEnemy: heroe.archEnemy.value,
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
        })
    }
}
