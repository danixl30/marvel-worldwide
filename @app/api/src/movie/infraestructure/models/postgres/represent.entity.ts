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
    @ManyToOne(() => Heroe)
    @JoinColumn({
        name: 'idHeroe',
    })
    heroe?: Heroe
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idHeroe?: string
    @ManyToOne(() => Villain)
    @JoinColumn({
        name: 'idVillain',
    })
    villain?: Villain
    @Column({
        type: 'uuid',
        nullable: true,
    })
    idVillain?: string
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    type: string
    @PrimaryColumn({
        type: 'varchar',
    })
    firstName: string
    @PrimaryColumn({
        type: 'varchar',
    })
    lastName: string
}
