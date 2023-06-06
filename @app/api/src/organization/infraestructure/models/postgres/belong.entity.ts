import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Belong {
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @Column({
        type: 'varchar',
    })
    charge: string
}
