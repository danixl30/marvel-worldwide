import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column } from 'typeorm'
import { Combat } from './combat.entity'
import { ObjectItem } from 'src/heroe/infraestructure/models/postgres/object.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Utilize {
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
    @ManyToOne(() => Combat)
    @JoinColumn({
        name: 'idCombat',
    })
    combat: Combat
    @ManyToOne(() => ObjectItem)
    @JoinColumn({
        name: 'idObject',
    })
    objectItem: ObjectItem
    @PrimaryColumn({
        type: 'uuid',
    })
    idCombat: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
