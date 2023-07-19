import { Dictionary, Optional } from '@mono/types-utils'
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
import { Character } from 'src/combat/domain/entities/character/character'
import { CharacterId } from 'src/combat/domain/entities/character/value-objects/id'
import { objectKeys, objectValues } from '@mono/object-utils'
import { ObjectId } from 'src/combat/domain/entities/character/value-objects/object'
import { PowerId } from 'src/combat/domain/entities/character/value-objects/power'

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
            .getOne()
        if (!combat) return null
        const participations = await this.participateDB
            .createQueryBuilder('part')
            .innerJoinAndSelect('part.character', 'character')
            .where({
                idCombat: combat.id,
            })
            .getMany()
        const utilezes = await this.utilizeDB
            .createQueryBuilder('utl')
            .innerJoinAndSelect('utl.character', 'character')
            .where({
                idCombat: combat.id,
            })
            .getMany()
        const recordId: Dictionary<{
            kind: string
        }> = {}
        participations.forEach((e) => {
            recordId[e.idCharacter] = e.character
        })
        utilezes.forEach((e) => {
            recordId[e.idCharacter] = e.character
        })
        const charcters = objectKeys(recordId).map((id) => {
            const powers = participations.filter((e) => e.idCharacter === id)
            const objects = utilezes.filter((e) => e.idCharacter === id)
            return new Character(
                new CharacterId(id, recordId[id].kind),
                objects.map((object) => new ObjectId(object.idObject)),
                powers.map((power) => new PowerId(power.idPower)),
            )
        })
        return new Combat(
            new CombatId(combat.id),
            new CombatPlace(combat.place),
            new CombatDate(combat.date),
            charcters,
        )
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Combat[]> {
        const combats = await this.combatDB
            .createQueryBuilder()
            .where('place like :term', {
                term: `%${criteria.term}%`,
            })
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
        const places = await this.combatDB
            .createQueryBuilder('combat')
            .select('combat.place')
            .addSelect('count(combat.place)', 'loc')
            .groupBy('combat.place')
            .orderBy('loc', 'DESC')
            .limit(3)
            .getRawMany()
        return places.map((e) => new CombatPlace(e.combat_place))
    }
}
