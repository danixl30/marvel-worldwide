import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column } from 'typeorm'
import { Power } from './power.entity'
import { Heroe } from './heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Own {
    @ManyToOne(() => Heroe)
    @JoinColumn({
        name: 'idHeroe',
    })
    heroe?: Heroe
    @Column({
        type: 'uuid',
    })
    idHeroe?: string
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain?: Villain
    @Column({
        type: 'uuid',
    })
    idVillain?: string
    @ManyToOne(() => Power)
    @JoinColumn({
        name: 'idPower',
    })
    power: Power
    @PrimaryColumn({
        type: 'uuid',
    })
    idPower: string
}
