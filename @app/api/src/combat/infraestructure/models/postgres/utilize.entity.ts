import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Combat } from './combat.entity'
import { ObjectItem } from 'src/heroe/infraestructure/models/postgres/object.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'

@Entity()
export class Utilize {
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
    @ManyToOne(() => ObjectItem)
    @JoinColumn({
        name: 'idObject',
    })
    objectItem: ObjectItem
    @PrimaryColumn({
        type: 'uuid',
    })
    idCombat: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
