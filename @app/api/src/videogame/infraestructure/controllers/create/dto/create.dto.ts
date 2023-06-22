import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export class ActorNameDTO {
    @ApiProperty()
    firstName: string
    @ApiProperty()
    lastName: string
}

export class ActorCharacterDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    kind: string
}

export class CreateActorDTO {
    @ApiProperty()
    name: ActorNameDTO
    @ApiProperty()
    role: ActorRoleType
    @ApiProperty()
    character: ActorCharacterDTO
}

export class OrganizationsRefDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    participationType: OrgParticipationType
}

export class CreateVideogameDTO {
    @ApiProperty()
    @IsString()
    title: string
    @ApiProperty()
    @IsString()
    synopsis: string
    @ApiProperty()
    @IsString()
    release: Date
    @ApiProperty()
    @IsString()
    creator: string
    @ApiProperty()
    @IsString()
    type: string
    @ApiProperty()
    platforms: string[]
    @ApiProperty()
    @IsString()
    comic: string
    @ApiProperty({
        type: [CreateActorDTO],
    })
    actors: CreateActorDTO[]
    @ApiProperty({
        type: [OrganizationsRefDTO],
    })
    organizations: OrganizationsRefDTO[]
}
