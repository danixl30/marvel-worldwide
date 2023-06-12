import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Organization } from 'src/organization/infraestructure/models/postgres/organization.entity'
import { Movie } from './movie.entity'
import { Serie } from 'src/serie/infraestructure/models/postgres/serie.entity'
import { Videogame } from 'src/videogame/infraestructure/models/postgres/videogame.entity'

@Entity()
export class Appear {
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
    @ManyToOne(() => Organization)
    @JoinColumn({
        name: 'idOrganization',
    })
    organization: Organization
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
    @Column({
        type: 'varchar',
    })
    type: string
    @Column({
        type: 'varchar',
    })
    finalState: string
}
