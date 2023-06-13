import {
    Check,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm'
import { Profile } from './profile.entity'
import { Movie } from 'src/movie/infraestructure/models/postgres/movie.entity'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'
import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'

@Entity()
@Check('"rating" > 0')
@Check('"rating" < 6')
export class Calification {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @ManyToOne(() => Profile)
    @JoinTable({
        name: 'idProfile',
    })
    profile: Profile
    @PrimaryColumn({
        type: 'uuid',
    })
    idProfile: string
    @Column({
        type: 'int',
    })
    rating: number
    @Column({
        type: 'timestamp',
    })
    timestamp: Date
}
