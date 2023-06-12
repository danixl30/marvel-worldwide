import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column } from 'typeorm'
import { ObjectItem } from './object.entity'
import { Heroe } from './heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Use {
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
    @ManyToOne(() => ObjectItem)
    @JoinColumn({
        name: 'idObject',
    })
    objectItem: ObjectItem
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
