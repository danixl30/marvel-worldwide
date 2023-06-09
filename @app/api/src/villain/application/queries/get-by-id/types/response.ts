import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export type GetVillainByIdResponse = {
    id: string
    person: {
        id: string
        phrase: string
        name: string
        lastName: string
        nationalities: string[]
        occupations: string[]
        hairColor: string
        eyesColor: string
        maritialStatus: MaritialStatuses
        gender: Genders
    }
    objects: ({ id: string } & ObjectDTO)[]
    powers: ({ id: string } & PowerDTO)[]
    name: string
    enemies: {
        id: string
        name: string
    }[]
    enemieGroups: string[]
    objetive: string
    logo: string
}
