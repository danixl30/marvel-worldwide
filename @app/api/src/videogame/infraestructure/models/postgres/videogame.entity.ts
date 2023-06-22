import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'
import { videogameTypes } from 'src/videogame/domain/value-objects/type'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Videogame {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'id',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    company: string
    @Column({
        type: 'enum',
        enum: videogameTypes,
    })
    type: string
}
