import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Villain {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'id',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
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
