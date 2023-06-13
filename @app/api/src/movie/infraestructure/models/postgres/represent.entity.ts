import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Media } from './media.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Movie } from './movie.entity'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'

@Entity()
export class Represent {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'idMedia',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    type: string
    @Column({
        type: 'varchar',
    })
    firstName: string
    @Column({
        type: 'varchar',
    })
    lastName: string
}
