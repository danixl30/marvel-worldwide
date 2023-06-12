import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column } from 'typeorm'
import { Organization } from './organization.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Lead {
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
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
}
