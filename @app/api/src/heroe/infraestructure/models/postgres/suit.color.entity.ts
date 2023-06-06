import { Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Person } from './person.entity'

@Entity()
export class ColorSuit {
    @ManyToOne(() => Person)
    @JoinTable({
        name: 'idPerson',
    })
    person: Person
    @PrimaryColumn({
        type: 'uuid',
    })
    idPerson: string
    @PrimaryColumn({
        type: 'varchar',
    })
    color: string
}
