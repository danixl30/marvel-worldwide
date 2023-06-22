import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'
import { Movie } from 'src/movie/infraestructure/models/postgres/movie.entity'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'
import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'

@Entity()
export class History {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
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
        nullable: true,
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
