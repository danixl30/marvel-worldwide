import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Media } from './media.entity'
import { Movie } from './movie.entity'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'

@Entity()
export class Develop {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Movie)
    @JoinColumn({
        name: 'idMovie',
    })
    movie?: Movie
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idMovie?: string
    @ManyToOne(() => Serie)
    @JoinColumn({
        name: 'idSerie',
    })
    serie?: Serie
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idSerie?: string
    @ManyToOne(() => Videogame)
    @JoinColumn({
        name: 'idVideogame',
    })
    videogame?: Videogame
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idVideogame?: string
    @Column({
        type: 'varchar',
    })
    type: string
}
