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

export class ModifyVideogameDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    title?: string
    @ApiProperty()
    synopsis?: string
    @ApiProperty()
    release?: Date
    @ApiProperty()
    creator?: string
    @ApiProperty()
    type?: string
    @ApiProperty()
    platforms?: string[]
    @ApiProperty()
    comic?: string
    @ApiProperty({
        type: [CreateActorDTO],
    })
    actors: CreateActorDTO[]
    @ApiProperty()
    actorsToRemove: string[]
    @ApiProperty()
    organizations: {
        id: string
        participationType: OrgParticipationType
    }[]
    organizationsToRemove: {
        id: string
        participationType: OrgParticipationType
    }[]
}
