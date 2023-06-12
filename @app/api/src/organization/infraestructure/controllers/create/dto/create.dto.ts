import { ApiProperty } from '@nestjs/swagger'

export class CreateOrganizationDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    leader: {
        id: string
        kind: string
    }
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
    headquarter?: {
        name: string
        place: {
            country: string
            city: string
        }
        kind: string
    }
    @ApiProperty()
    members: {
        id: string
        kind: string
        charge: string
    }[]
    @ApiProperty()
    firstApparition: string
}
