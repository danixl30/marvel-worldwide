import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Media } from './media.entity'
import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'

@Entity()
export class Represent {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'enum',
        enum: ActorRoleType,
    })
    type: ActorRoleType
    @Column({
        type: 'varchar',
    })
    firstName: string
    @Column({
        type: 'varchar',
    })
    lastName: string
}
