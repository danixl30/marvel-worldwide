import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Character } from './character.entity'
import { ObjectItem } from './object.entity'

@Entity()
export class Use {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @ManyToOne(() => ObjectItem)
    @JoinColumn({
        name: 'idObject',
    })
    objectItem: ObjectItem
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
