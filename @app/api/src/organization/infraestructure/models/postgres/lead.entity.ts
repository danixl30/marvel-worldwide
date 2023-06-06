import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Lead {
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
}
