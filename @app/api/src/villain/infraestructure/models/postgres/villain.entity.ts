import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Villain extends Character {
    @Column({
        type: 'varchar',
    })
    name: string
    @Column({
        type: 'varchar',
    })
    logo: string
    @Column({
        type: 'varchar',
    })
    objetive: string
}
