import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Videogame extends Media {
    @Column({
        type: 'varchar',
    })
    company: string
    @Column({
        type: 'varchar',
    })
    type: string
}
