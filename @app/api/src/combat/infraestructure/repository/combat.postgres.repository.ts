import { Optional } from '@mono/types-utils'
import { InjectRepository } from '@nestjs/typeorm'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { CombatRepository } from 'src/combat/application/repositories/combat.repository'
import { Combat } from 'src/combat/domain/combat'
import { CombatId } from 'src/combat/domain/value-objects/id'
import { CombatPlace } from 'src/combat/domain/value-objects/place'
import { Combat as CombatDB } from '../models/postgres/combat.entity'
import { Repository } from 'typeorm'
import { Participate } from '../models/postgres/participate.entity'
import { Utilize } from '../models/postgres/utilize.entity'
import { CombatDate } from 'src/combat/domain/value-objects/date'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CombatPostgresRepository implements CombatRepository {
    constructor(
        @InjectRepository(CombatDB)
        private readonly combatDB: Repository<CombatDB>,
        @InjectRepository(Participate)
        private readonly participateDB: Repository<Participate>,
        @InjectRepository(Utilize)
        private readonly utilizeDB: Repository<Utilize>,
    ) {}
    async save(aggregate: Combat): Promise<void> {
        await this.combatDB.upsert(
            this.combatDB.create({
                id: aggregate.id.value,
                place: aggregate.place.value,
                date: aggregate.date.value,
            }),
            ['id'],
        )
        await this.participateDB.delete({
            idCombat: aggregate.id.value,
        })
        await this.utilizeDB.delete({
            idCombat: aggregate.id.value,
        })
        await aggregate.characters.asyncForEach(async (e) => {
            await e.powers.asyncForEach((power) =>
                this.participateDB.insert(
                    this.participateDB.create({
                        idPower: power.value,
                        idCharacter: e.id.id,
                        idCombat: aggregate.id.value,
                    }),
                ),
            )
            await e.objects.asyncForEach((object) =>
                this.utilizeDB.insert(
                    this.utilizeDB.create({
                        idCharacter: e.id.id,
                        idObject: object.value,
                        idCombat: aggregate.id.value,
                    }),
                ),
            )
        })
    }

    async delete(aggregate: Combat): Promise<void> {
        await this.participateDB.delete({
            idCombat: aggregate.id.value,
        })
        await this.utilizeDB.delete({
            idCombat: aggregate.id.value,
        })
        await this.combatDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: CombatId): Promise<Optional<Combat>> {
        const combat = await this.combatDB
            .createQueryBuilder()
            .andWhere({
                id: id.value,
            })
            .innerJoinAndSelect(Participate, 'p', 'p.combatId = Combat.id')
            .innerJoinAndSelect(Utilize, 'u', 'u.combatId = Combat.id')
            .getOne()
        if (!combat) return null
        return new Combat(
            new CombatId(combat.id),
            new CombatPlace(combat.place),
            new CombatDate(combat.date),
            [],
        )
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Combat[]> {
        const combats = await this.combatDB
            .createQueryBuilder()
            .andWhere({
                id: criteria.term,
            })
            .innerJoinAndSelect(Participate, 'p', 'p.combatId = Combat.id')
            .innerJoinAndSelect(Utilize, 'u', 'u.combatId = Combat.id')
            .getMany()
        return combats.map(
            (combat) =>
                new Combat(
                    new CombatId(combat.id),
                    new CombatPlace(combat.place),
                    new CombatDate(combat.date),
                    [],
                ),
        )
    }

    async getTop3Locations(): Promise<CombatPlace[]> {
        return []
    }
}
