import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Organization {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    objetive: string
    @Column({
        type: 'varchar',
    })
    slogan: string
    @Column({
        type: 'varchar',
    })
    name: string
    @Column({
        type: 'varchar',
    })
    creationPlace: string
    @Column({
        type: 'varchar',
    })
    type: string
    @Column({
        type: 'varchar',
    })
    firstApparition: string
}
