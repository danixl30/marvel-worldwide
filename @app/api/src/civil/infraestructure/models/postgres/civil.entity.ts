import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Civil extends Character {
    @Column({
        type: 'uuid',
    })
    idHeroe: string
    @Column({
        type: 'uuid',
    })
    idVillain: string
}
