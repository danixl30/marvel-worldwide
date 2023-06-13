import { ApiProperty } from '@nestjs/swagger'
import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export class CreateHeroeDTO {
    @ApiProperty()
    person?: {
        name: string
        phrase: string
        lastName: string
        nationalities: string[]
        occupations: string[]
        hairColor: string
        eyesColor: string
        maritialStatus: MaritialStatuses
        gender: Genders
    }
    @ApiProperty()
    personId?: string
    @ApiProperty()
    objectsId: string[]
    @ApiProperty()
    powersId: string[]
    @ApiProperty()
    objects: ObjectDTO[]
    @ApiProperty()
    powers: PowerDTO[]
    @ApiProperty()
    name: string
    @ApiProperty()
    creator: {
        firstName: string
        lastName: string
    }
    @ApiProperty()
    archEnemy: string
    @ApiProperty()
    phrase: string
    @ApiProperty()
    colors: string[]
    @ApiProperty()
    logo: string
}
