import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Character } from './character.entity'
import { Power } from './power.entity'

@Entity()
export class Own {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @ManyToOne(() => Power)
    @JoinColumn({
        name: 'idPower',
    })
    power: Power
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idPower: string
}
