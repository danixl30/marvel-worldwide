import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Person {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'date',
    })
    firstApparition: Date
    @Column({
        type: 'enum',
        enum: MaritialStatuses,
    })
    maritialState: MaritialStatuses
    @Column({
        type: 'varchar',
    })
    firstName: string
    @Column({
        type: 'varchar',
    })
    lastName: string
    @Column({
        type: 'enum',
        enum: Genders,
    })
    gender: Genders
    @Column({
        type: 'varchar',
    })
    hairColor: string
    @Column({
        type: 'varchar',
    })
    eyesColor: string
    @Column({
        type: 'varchar',
    })
    phrase: string
}
