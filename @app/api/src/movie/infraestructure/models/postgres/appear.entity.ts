import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Appear {
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
