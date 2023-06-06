import { Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Person } from './person.entity'

@Entity()
export class Ocupation {
    @PrimaryColumn({
        type: 'uuid',
    })
    @ManyToOne(() => Person)
    @JoinTable({
        name: 'id',
    })
    idPerson: string
    @PrimaryColumn({
        type: 'varchar',
    })
    name: string
}
