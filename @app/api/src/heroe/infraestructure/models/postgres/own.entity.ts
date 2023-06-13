import {
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
} from 'typeorm'
import { Power } from './power.entity'
import { Heroe } from './heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Character } from './character.entity'

@Entity()
export class Own {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @ManyToOne(() => Power, (power) => power.id)
    @JoinColumn({
        name: 'idPower',
    })
    power: Power
    @PrimaryColumn({
        type: 'uuid',
    })
    idPower: string
}
