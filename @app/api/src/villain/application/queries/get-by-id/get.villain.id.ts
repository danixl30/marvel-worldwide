import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetVillainByIdDTO } from './types/dto'
import { GetVillainByIdResponse } from './types/response'
import { VillainRepository } from '../../repositories/villain.repository'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { VillainNotFoundError } from '../../errors/villain.not.found'

export class GetVillainByIdQuery implements ApplicationService<GetVillainByIdDTO, GetVillainByIdResponse, ApplicationError> {
    constructor(private readonly villainRepository: VillainRepository) {}

    async execute(data: GetVillainByIdDTO): Promise<Result<GetVillainByIdResponse, ApplicationError>> {
        const villain = await this.villainRepository.getById(new VillainId(data.id))
        if (!villain) return Result.error(new VillainNotFoundError())
        return Result.success({
            id: data.id,
            person: {
                id: villain.person.id.value,
                name: villain.person.name.firstName,
                lastName: villain.person.name.lastName,
                gender: villain.person.gender.value,
                maritialStatus: villain.person.maritialStatus.value,
                hairColor: villain.person.hair.value,
                eyesColor: villain.person.eye.value,
                occupations: villain.person.occupations.map((e) => e.value),
                nationalities: villain.person.nationalites.map((e) => e.value),
            },
            name: villain.name.value,
            objetive: villain.objetive.value,
            enemies: villain.enemies.map((e) => e.value),
            enemieGroups: villain.enemieGroups.map((e) => e.value),
            objects: villain.objects.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                description: e.description.value,
                material: e.material.value,
                kind: e.kind.value,
                creator: e.creator.value,
            })),
            powers: villain.powers.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                description: e.description.value,
                type: e.type.value,
            })),
        })
    }
}
