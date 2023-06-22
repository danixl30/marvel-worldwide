import { ApiProperty } from '@nestjs/swagger'

export class CreateCombatCharactersDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    kind: string
    @ApiProperty()
    powers: string[]
    @ApiProperty()
    objects: string[]
}

export class CreateCombatDTO {
    @ApiProperty()
    date: Date
    @ApiProperty()
    place: string
    @ApiProperty({
        type: [CreateCombatCharactersDTO],
    })
    characters: CreateCombatCharactersDTO[]
}
