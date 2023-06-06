import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Own {
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idPower: string
}
