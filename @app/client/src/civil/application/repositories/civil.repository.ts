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

export type GetByCriteriaDTO = {
    term: string
    page: number
    limit?: number
}

export type GetCivilByIdResponse = {
    id: string
    person: {
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
    relation: {
        target: string
        name: string
        kind: string
    }
}

export type GetCivilsByCriteriaResponse = {
    id: string
    name: {
        firstName: string
        lastName: string
    }
}[]

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
        maritialStatus?: string
        gender?: string
    }
    personId?: string
    relation?: {
        target: string
        kind: string
    }
}

export type CivilRepository = {
    create(dto: CreateCivilDTO): Promise<void>
    getAll(): Promise<CivilList[]>
    getById(id: string): Promise<GetCivilByIdResponse>
    getByCriteria(dto: GetByCriteriaDTO): Promise<GetCivilsByCriteriaResponse>
    modify(data: ModifyCivilDTO): Promise<void>
}
