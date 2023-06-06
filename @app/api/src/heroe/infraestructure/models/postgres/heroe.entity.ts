import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Character } from './character.entity'

@Entity()
export class Heroe extends Character {
    @Column({
        type: 'varchar',
    })
    name: string
    @Column({
        type: 'varchar',
    })
    logo: string
    @Column({
        type: 'uuid',
    })
    idArchEnemy: string
}
