import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
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
