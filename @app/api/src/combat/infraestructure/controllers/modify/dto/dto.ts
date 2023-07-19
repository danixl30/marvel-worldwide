import { ApiProperty } from '@nestjs/swagger'
import { CreateCombatCharactersDTO } from '../../create/dto/create.dto'

export class CharctersToRemoveDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    kind: string
}

export class ModifyCombatDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    date?: Date
    @ApiProperty()
    place?: string
    @ApiProperty({
        type: [CreateCombatCharactersDTO],
    })
    charactersToAdd: CreateCombatCharactersDTO[]
    @ApiProperty({
        type: [CharctersToRemoveDTO],
    })
    charactersToRemove: CharctersToRemoveDTO[]
}
