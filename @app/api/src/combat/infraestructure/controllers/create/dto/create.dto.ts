import { ApiProperty } from '@nestjs/swagger'

export class CreateCombatDTO {
    @ApiProperty()
    date: Date
    @ApiProperty()
    place: string
    @ApiProperty()
    characters: {
        id: string
        kind: string
        powers: string[]
        objects: string[]
    }[]
}
