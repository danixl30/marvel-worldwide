import { ApiProperty } from '@nestjs/swagger'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export class ModifyCivilDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    person?: {
        name?: string
        phrase?: string
        lastName?: string
        nationalities?: string[]
        occupations?: string[]
        hairColor?: string
        eyesColor?: string
        maritialStatus?: MaritialStatuses
        gender?: Genders
    }
    @ApiProperty()
    personId?: string
    @ApiProperty()
    relation?: {
        target: string
        kind: string
    }
}
