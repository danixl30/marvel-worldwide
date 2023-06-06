import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Media } from './media.entity'
import { Actor } from './actor.entity'

@Entity()
export class Represent {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @ManyToOne(() => Actor)
    @JoinColumn({
        name: 'idActor',
    })
    actor: Actor
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @Column({
        type: 'varchar',
    })
    type: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idActor: string
}
