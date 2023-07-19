import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export type ModifySerieDTO = {
    id: string
    title?: string
    synopsis?: string
    release?: Date
    creator?: string
    episodes?: number
    type?: string
    channel?: string
    comic?: string
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: ActorRoleType
        character: {
            id: string
            kind: string
        }
    }[]
    actorsToRemove: string[]
    organizations: {
        id: string
        participationType: OrgParticipationType
    }[]
    organizationsToRemove: {
        id: string
        participationType: OrgParticipationType
    }[]
}
