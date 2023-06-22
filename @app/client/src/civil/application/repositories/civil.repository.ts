export type CivilList = {
    id: string
    name: string
}

export type CreateCivilDTO = {
    person?: {
        name: string
        phrase: string
        lastName: string
        nationalities: string[]
        occupations: string[]
        hairColor: string
        eyesColor: string
        maritialStatus: string
        gender: string
    }
    personId?: string
    relation: {
        target: string
        kind: string
    }
}

export type CivilRepository = {
    create(dto: CreateCivilDTO): Promise<void>
    getAll(): Promise<CivilList[]>
}
