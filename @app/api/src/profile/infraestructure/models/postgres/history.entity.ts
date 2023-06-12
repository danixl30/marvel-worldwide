import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'
import { Movie } from 'src/movie/infraestructure/models/postgres/movie.entity'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'

@Entity()
export class History {
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
    @ManyToOne(() => Profile)
    @JoinColumn({
        name: 'idProfile',
    })
    profile: Profile
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idProfile: string
    @Column({
        type: 'timestamp',
    })
    initDate: Date
    @Column({
        type: 'timestamp',
    })
    endDate?: Date
    @Column({
        type: 'varchar',
    })
    device: string
    @Column({
        type: 'varchar',
    })
    mediaKind: string
}
