import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Media } from './media.entity'
import { Organization } from 'src/organization/infraestructure/models/postgres/organization.entity'

@Entity()
export class Appear {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @ManyToOne(() => Organization)
    @JoinColumn({
        name: 'idOrganization',
    })
    organization: Organization
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
    @Column({
        type: 'varchar',
    })
    type: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @Column({
        type: 'varchar',
    })
    finalState: string
}
