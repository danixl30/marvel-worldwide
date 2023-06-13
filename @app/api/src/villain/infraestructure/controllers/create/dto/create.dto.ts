import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export class CreateVillainDTO {
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
    @IsOptional()
    @IsUUID()
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
    @IsString()
    name: string
    @ApiProperty()
    creator: {
        firstName: string
        lastName: string
    }
    @ApiProperty()
    enemies: string[]
    @ApiProperty()
    enemieGroups: string[]
    @ApiProperty()
    objetive: string
    @ApiProperty()
    @IsString()
    logo: string
}
