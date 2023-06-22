import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'
import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export class CreateSerieDTO {
    @ApiProperty()
    @IsString()
    title: string
    @ApiProperty()
    @IsString()
    synopsis: string
    @ApiProperty()
    release: Date
    @ApiProperty()
    @IsString()
    creator: string
    @ApiProperty()
    @IsNumber()
    episodes: number
    @ApiProperty()
    @IsString()
    type: string
    @ApiProperty()
    @IsString()
    channel: string
    @ApiProperty()
    @IsString()
    comic: string
    @ApiProperty()
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: ActorRoleType
        character: {
            id: string
            kind: string
        }
    }[]
    @ApiProperty()
    organizations: {
        id: string
        participationType: OrgParticipationType
    }[]
}
