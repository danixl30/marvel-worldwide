import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export class CreatePersonDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    phrase: string
    @ApiProperty()
    lastName: string
    @ApiProperty()
    nationalities: string[]
    @ApiProperty()
    occupations: string[]
    @ApiProperty()
    hairColor: string
    @ApiProperty()
    eyesColor: string
    @ApiProperty()
    maritialStatus: MaritialStatuses
    @ApiProperty()
    gender: Genders
}

export class CreateObjectDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @ApiProperty()
    material: string
    @ApiProperty()
    creator: string
    @ApiProperty()
    kind: string
}

export class CreatePowerDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @ApiProperty()
    type: string
}

export class CreateVillainDTO {
    @ApiProperty()
    person?: CreatePersonDTO
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    personId?: string
    @ApiProperty()
    objectsId: string[]
    @ApiProperty()
    powersId: string[]
    @ApiProperty({
        type: [CreateObjectDTO],
    })
    objects: ObjectDTO[]
    @ApiProperty({
        type: [CreatePowerDTO],
    })
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
