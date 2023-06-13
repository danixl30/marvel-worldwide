import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Combat } from './combat.entity'
import { Power } from 'src/heroe/infraestructure/models/postgres/power.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'

@Entity()
export class Participate {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain?: Villain
    @ManyToOne(() => Heroe)
    @JoinColumn({
        name: 'idHeroe',
    })
    heroe?: Heroe
    @ManyToOne(() => Combat)
    @JoinColumn({
        name: 'idCombat',
    })
    combat: Combat
    @ManyToOne(() => Power)
    @JoinColumn({
        name: 'idPower',
    })
    power: Power
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idVillain?: string
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idHeroe?: string
    @Column({
        type: 'uuid',
    })
    idCombat: string
    @Column({
        type: 'uuid',
    })
    idPower: string
}
