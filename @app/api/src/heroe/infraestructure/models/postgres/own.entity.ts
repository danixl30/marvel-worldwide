import {
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Power } from './power.entity'
import { Heroe } from './heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Own {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Heroe)
    @JoinColumn({
        name: 'idHeroe',
    })
    heroe?: Heroe
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idHeroe?: string
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain?: Villain
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idVillain?: string
    @ManyToOne(() => Power, (power) => power.id)
    @JoinColumn({
        name: 'idPower',
    })
    power: Power
    @Column({
        type: 'uuid',
    })
    idPower: string
}
