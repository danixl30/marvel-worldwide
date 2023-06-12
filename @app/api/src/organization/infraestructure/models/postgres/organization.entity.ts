import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Headquarter } from './headquarter.entity'

@Entity()
export class Organization {
    @ManyToOne(() => Headquarter)
    @JoinColumn({
        name: 'headquarterId',
    })
    headquarter: Headquarter
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
    @Column({
        type: 'uuid',
    })
    headquarterId: string
}
