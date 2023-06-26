import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Civil {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'id',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idRelation',
    })
    relation: Character
    @Column({
        type: 'uuid',
    })
    idRelation: string
}
