import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Organization } from 'src/organization/infraestructure/models/postgres/organization.entity'
import { Media } from './media.entity'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

@Entity()
export class Appear {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
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
        type: 'enum',
        enum: OrgParticipationType,
    })
    type: OrgParticipationType
}
