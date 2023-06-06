import { Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Person } from './person.entity'

export abstract class Character {
    @ManyToOne(() => Person)
    @JoinColumn({
        name: 'personId',
    })
    person: Person
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'uuid',
    })
    personId: string
}
