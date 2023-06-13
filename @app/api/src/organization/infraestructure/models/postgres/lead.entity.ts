import {
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
} from 'typeorm'
import { Organization } from './organization.entity'
import { Heroe } from 'src/heroe/infraestructure/models/postgres/heroe.entity'
import { Villain } from 'src/villain/infraestructure/models/postgres/villain.entity'
import { Character } from 'src/heroe/infraestructure/models/postgres/character.entity'

@Entity()
export class Lead {
    @ManyToOne(() => Character)
    @JoinColumn({
        name: 'idCharacter',
    })
    character: Character
    @PrimaryColumn({
        type: 'uuid',
    })
    idCharacter: string
    @ManyToOne(() => Organization)
    @JoinColumn({
        name: 'idOrganization',
    })
    organization: Organization
    @PrimaryColumn({
        type: 'uuid',
    })
    idOrganization: string
}
