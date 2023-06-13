import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Person } from './person.entity'

@Entity()
export class Character {
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
    @Column({
        type: 'enum',
        enum: ['heroe', 'villain', 'civil'],
    })
    kind: string
}
