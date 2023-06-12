import { Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Heroe } from './heroe.entity'

@Entity()
export class ColorSuit {
    @ManyToOne(() => Heroe)
    @JoinTable({
        name: 'idPerson',
    })
    heroe: Heroe
    @PrimaryColumn({
        type: 'uuid',
    })
    idHeroe: string
    @PrimaryColumn({
        type: 'varchar',
    })
    color: string
}
