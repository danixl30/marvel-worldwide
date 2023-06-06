import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Represent {
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @Column({
        type: 'varchar',
    })
    type: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idMedia: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idActor: string
}
