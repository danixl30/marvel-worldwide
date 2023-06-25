import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Headquarter } from './headquarter.entity'
import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'

@Entity()
export class Organization {
    @ManyToOne(() => Headquarter)
    @JoinColumn({
        name: 'headquarterId',
    })
    headquarter: Headquarter
    @Column({
        type: 'uuid',
    })
    headquarterId: string
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idFounder',
    })
    founder: Character
    @Column({
        type: 'uuid',
    })
    idFounder: string
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'varchar',
    })
    objetive: string
    @Column({
        type: 'varchar',
    })
    slogan: string
    @Column({
        type: 'varchar',
    })
    name: string
    @Column({
        type: 'varchar',
    })
    creationPlace: string
    @Column({
        type: 'varchar',
    })
    type: string
    @Column({
        type: 'varchar',
    })
    firstApparition: string
}
