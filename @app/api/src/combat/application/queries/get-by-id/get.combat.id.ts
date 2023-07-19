import { ApplicationService } from 'src/core/application/service/application.service'
import { GetCombatByIdDTO } from './types/dto'
import { GetCombatByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CombatRepository } from '../../repositories/combat.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatNotFoundError } from '../../errors/combat.not.found'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { CharacterId } from 'src/combat/domain/entities/character/value-objects/id'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { PowerId } from 'src/combat/domain/entities/character/value-objects/power'
import { ObjectId } from 'src/combat/domain/entities/character/value-objects/object'
import { PowerId as CharacterPowerId } from 'src/heroe/domain/entities/power/value-objects/power.id'
import { ObjectId as CharacterObjectId } from 'src/heroe/domain/entities/object/value-objects/object.id'

export class GetCombatByIdQuery
    implements
        ApplicationService<
            GetCombatByIdDTO,
            GetCombatByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly combatRepository: CombatRepository,
        private readonly heroeRepository: HeroeRepository,
        private readonly villainRepository: VillainRepository,
        private readonly civilRepository: CivilRepository,
    ) {}

    async getHeroeVillainOrCivil(id: CharacterId) {
        const civil = await this.civilRepository.getById(new CivilId(id.id))
        if (civil)
            return {
                id: civil.id.value,
                name: civil.person.name.value,
                kind: 'civil',
            }
        const heroe = await this.heroeRepository.getById(new HeroeId(id.id))
        if (heroe)
            return {
                id: heroe.id.value,
                name: heroe.name.value,
                kind: 'heroe',
            }
        const villain = await this.villainRepository.getById(
            new VillainId(id.id),
        )
        if (villain)
            return {
                id: villain.id.value,
                name: villain.name.value,
                kind: 'villain',
            }
        throw new Error('Target not found')
    }

    private async getPower(id: PowerId) {
        const power = await this.heroeRepository.getPowerById(
            new CharacterPowerId(id.value),
        )
        if (!power) throw new Error('Power not found')
        return {
            id: id.value,
            name: power.name.value,
            type: power.type.value,
        }
    }

    private async getObject(id: ObjectId) {
        const object = await this.heroeRepository.getObjectById(
            new CharacterObjectId(id.value),
        )
        if (!object) throw new Error('Power not found')
        return {
            id: id.value,
            name: object.name.value,
            kind: object.kind.value,
            description: object.description.value,
            material: object.material.value,
        }
    }

    async execute(
        data: GetCombatByIdDTO,
    ): Promise<Result<GetCombatByIdResponse, ApplicationError>> {
        const combat = await this.combatRepository.getById(
            new CombatId(data.id),
        )
        if (!combat) return Result.error(new CombatNotFoundError())
        return Result.success({
            id: combat.id.value,
            date: combat.date.value,
            place: combat.place.value,
            characters: await combat.characters.asyncMap(async (character) => {
                const characterDetail = await this.getHeroeVillainOrCivil(
                    character.id,
                )
                return {
                    id: character.id.id,
                    name: characterDetail.name,
                    kind: characterDetail.kind,
                    powers: await character.powers.asyncMap(
                        this.getPower.bind(this),
                    ),
                    objects: await character.objects.asyncMap(
                        this.getObject.bind(this),
                    ),
                }
            }),
        })
    }
}
