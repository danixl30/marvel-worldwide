import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Use {
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idObject: string
}
