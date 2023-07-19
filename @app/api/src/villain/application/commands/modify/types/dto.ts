import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'
import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export type ModifyVillainDTO = {
    id: string
    person?: {
        name?: string
        phrase?: string
        lastName?: string
        nationalities?: string[]
        occupations?: string[]
        hairColor?: string
        eyesColor?: string
        maritialStatus?: MaritialStatuses
        gender?: Genders
    }
    personId?: string
    objectsIdToAdd: string[]
    powersIdToAdd: string[]
    objectsIdToRemove: string[]
    powersIdToRemove: string[]
    objects: ObjectDTO[]
    powers: PowerDTO[]
    name?: string
    creator?: {
        firstName: string
        lastName: string
    }
    enemiesToAdd: string[]
    enemiesToRemove: string[]
    enemieGroups: string[]
    objetive?: string
    logo?: string
}
