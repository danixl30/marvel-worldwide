import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Serie extends Media {
    @Column({
        type: 'integer',
    })
    episodes: number
    @Column({
        type: 'varchar',
    })
    channel: string
    @Column({
        type: 'varchar',
    })
    type: string
    @Column({
        type: 'varchar',
    })
    creator: string
}
