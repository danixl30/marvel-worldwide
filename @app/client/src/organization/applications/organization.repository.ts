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

export type OrganizationRepository = {
    create(data: CreateOrganizationDTO): Promise<void>
    getAll(): Promise<OrganizationList[]>
    getAllHeadquarters(): Promise<HeadquarterList[]>
}
