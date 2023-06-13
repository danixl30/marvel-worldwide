import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjectItem } from './object.entity'
import { Heroe } from './heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Character } from './character.entity'

@Entity()
export class Use {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @ManyToOne(() => ObjectItem)
    @JoinColumn({
        name: 'idObject',
    })
    objectItem: ObjectItem
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
