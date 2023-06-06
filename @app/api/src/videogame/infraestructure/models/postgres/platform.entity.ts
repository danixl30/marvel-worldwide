import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Videogame } from './videogame.entity'

@Entity()
export class Platform {
    @ManyToOne(() => Videogame)
    @JoinColumn({
        name: 'idVideogame',
    })
    videogame: Videogame
    @PrimaryColumn({
        type: 'uuid',
    })
    idVideogame: string
    @PrimaryColumn({
        type: 'varchar',
    })
    name: string
}
