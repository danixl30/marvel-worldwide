import {
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Organization } from './organization.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Lead {
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
    @ManyToOne(() => Organization)
    @JoinColumn({
        name: 'idOrganization',
    })
    organization: Organization
    @Column({
        type: 'uuid',
    })
    idOrganization: string
}
