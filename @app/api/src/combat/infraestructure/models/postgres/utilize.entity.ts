import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Utilize {
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idCombat: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
