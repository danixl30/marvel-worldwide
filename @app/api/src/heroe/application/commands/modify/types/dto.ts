import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export type ObjectDTO = {
    name: string
    description: string
    material: string
    creator: string
    kind: string
}

export type PowerDTO = {
    name: string
    description: string
    type: string
}

export type ModifyHeroeDTO = {
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
    archEnemy?: string
    phrase?: string
    colors: string[]
    logo?: string
}
