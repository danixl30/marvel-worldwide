import { Genders } from 'src/heroe/domain/entities/person/value-objects/gender'
import { MaritialStatuses } from 'src/heroe/domain/entities/person/value-objects/maritial.status'

export type ModifyCivilDTO = {
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
    relation?: {
        target: string
        kind: string
    }
}
