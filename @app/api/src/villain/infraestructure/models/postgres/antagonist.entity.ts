import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Villain } from './villain.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'

@Entity()
export class Antagonist {
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain: Villain
    @ManyToOne(() => Heroe)
    @JoinColumn({
        name: 'idHeroe',
    })
    heroe: Heroe
    @PrimaryColumn({
        type: 'uuid',
    })
    idVillain: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idHeroe: string
}
