import { GetByCriteriaDTO } from '../../civil/application/repositories/civil.repository'

export type OrganizationList = {
    id: string
    name: string
}

export type HeadquarterList = {
    id: string
    name: string
}

export type CreateOrganizationDTO = {
    name: string
    leader: {
        id: string
        kind: string
    }
    objetive: string
    slogan: string
    founder: string
    creationPlace: string
    headquarterId?: string
    headquarter?: {
        name: string
        place: {
            country: string
            city: string
        }
        kind: string
    }
    members: {
        id: string
        kind: string
        charge: string
    }[]
    firstApparition: string
}

export type GetOrganizationByIdResponse = {
    id: string
    name: string
    leader: {
        id: string
        name: string
        kind: string
    }
    objetive: string
    slogan: string
    founder: {
        id: string
        kind: string
        name: string
    }
    creationPlace: string
    headquarter: {
        id: string
        name: string
        place: {
            country: string
            city: string
        }
        kind: string
    }
    members: {
        id: string
        name: string
        kind: string
        charge: string
    }[]
    firstApparition: string
}

export type GetOrganizationsByCriteriaResponse = {
    id: string
    name: string
    objetive: string
}[]

export type ModifyOrganizationDTO = {
    id: string
    name?: string
    leader?: {
        id: string
        kind: string
    }
    objetive?: string
    slogan?: string
    founder?: string
    creationPlace?: string
    headquarterId?: string
    headquarter?: {
        name?: string
        place?: {
            country: string
            city: string
        }
        kind?: string
    }
    members: {
        id: string
        kind: string
        charge: string
    }[]
    membersToRemove: {
        id: string
        kind: string
    }[]
    firstApparition?: string
}

export type OrganizationRepository = {
    create(data: CreateOrganizationDTO): Promise<void>
    getAll(): Promise<OrganizationList[]>
    getAllHeadquarters(): Promise<HeadquarterList[]>
    getById(id: string): Promise<GetOrganizationByIdResponse>
    getByCriteria(
        dto: GetByCriteriaDTO,
    ): Promise<GetOrganizationsByCriteriaResponse>
    modify(data: ModifyOrganizationDTO): Promise<void>
}
