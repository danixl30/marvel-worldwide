import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Participate {
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
    idPower: string
}
