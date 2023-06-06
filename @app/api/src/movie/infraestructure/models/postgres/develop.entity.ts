import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Develop {
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
}
