import { ActorRoleType } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { OrgParticipationType } from 'src/movie/domain/value-objects/organization'

export type ModifyVideogameDTO = {
    id: string
    title?: string
    synopsis?: string
    release?: Date
    creator?: string
    type?: string
    platforms?: string[]
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
