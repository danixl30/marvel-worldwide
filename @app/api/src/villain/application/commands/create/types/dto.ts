import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export type CreateVillainDTO = {
    person?: {
        name: string
        lastName: string
        nationalities: string[]
        occupations: string[]
        hairColor: string
        eyesColor: string
        maritialStatus: MaritialStatuses
        gender: Genders
    }
    personId?: string
    objectsId: string[]
    powersId: string[]
    objects: ObjectDTO[]
    powers: PowerDTO[]
    name: string
    creator: {
        firstName: string
        lastName: string
    }
    enemies: string[]
    enemieGroups: string[]
    objetive: string
}
