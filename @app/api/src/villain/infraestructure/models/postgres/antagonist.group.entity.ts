import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Villain } from './villain.entity'
import { Organization } from 'src/organization/infraestructure/models/postgres/organization.entity'

@Entity()
export class AntagonistGroup {
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain: Villain
    @ManyToOne(() => Organization)
    @JoinColumn({
        name: 'idOrganization',
    })
    organization: Organization
    @PrimaryColumn({
        type: 'uuid',
    })
    idVillain: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
}
