import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Character } from './character.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'

@Entity()
export class Heroe {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'id',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idArchEnemy',
    })
    archEnemy: Villain
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
        nullable: true,
    })
    idArchEnemy: string
}
