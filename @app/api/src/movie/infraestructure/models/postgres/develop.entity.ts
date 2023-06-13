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
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @Column({
        type: 'varchar',
    })
    type: string
}
