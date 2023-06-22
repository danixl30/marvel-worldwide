import { ApiProperty } from '@nestjs/swagger'

export class CreateLeaderDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    kind: string
}

export class PlaceDTO {
    @ApiProperty()
    country: string
    @ApiProperty()
    city: string
}

export class CreateHeadquarterDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    place: PlaceDTO
    @ApiProperty()
    kind: string
}

export class CreateMemberDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    kind: string
    @ApiProperty()
    charge: string
}

export class CreateOrganizationDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    leader: CreateLeaderDTO
    @ApiProperty()
    objetive: string
    @ApiProperty()
    slogan: string
    @ApiProperty()
    founder: string
    @ApiProperty()
    creationPlace: string
    @ApiProperty()
    headquarterId?: string
    @ApiProperty()
    headquarter?: CreateHeadquarterDTO
    @ApiProperty({
        type: [CreateMemberDTO],
    })
    members: CreateMemberDTO[]
    @ApiProperty()
    firstApparition: string
}
