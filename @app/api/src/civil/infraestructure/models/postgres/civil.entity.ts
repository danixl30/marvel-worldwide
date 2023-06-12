import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class Civil extends Character {
    @ManyToOne(() => Heroe)
    @JoinColumn({
        name: 'idHeroe',
    })
    heroe?: Heroe
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain?: Villain
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idHeroe: string
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idVillain: string
}
