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
