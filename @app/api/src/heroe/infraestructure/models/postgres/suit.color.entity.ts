import { Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Person } from './person.entity'

@Entity()
export class ColorSuit {
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
    color: string
}
