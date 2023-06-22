import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Combat } from './combat.entity'
import { Power } from 'src/heroe/infraestructure/models/postgres/power.entity'
import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'

@Entity()
export class Participate {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @ManyToOne(() => Combat)
    @JoinColumn({
        name: 'idCombat',
    })
    combat: Combat
    @ManyToOne(() => Power)
    @JoinColumn({
        name: 'idPower',
    })
    power: Power
    @PrimaryColumn({
        type: 'uuid',
    })
    idCombat: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idPower: string
}
