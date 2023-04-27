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

export type CreateHeroeDTO = {
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
    archEnemy: string
    phrase: string
}
