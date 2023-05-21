import { Actor } from 'src/movie/domain/entities/actor/actor'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { DomainEvent } from 'src/core/domain/events/event'
import { ReleaseDate } from '../value-objects/release.date'
import { VideogameCreator } from '../value-objects/creator'
import { VideogameId } from '../value-objects/id'
import { VideogamePlatform } from '../value-objects/platform'
import { VideogameSynopsis } from '../value-objects/synopsis'
import { VideogameTitle } from '../value-objects/title'
import { VideogameType } from '../value-objects/type'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'

export class VideogameCreatedEvent extends DomainEvent {
    constructor(
        private _id: VideogameId,
        private _title: VideogameTitle,
        private _synopsis: VideogameSynopsis,
        private _release: ReleaseDate,
        private _creator: VideogameCreator,
        private _type: VideogameType,
        private _basedOn: Comic,
        private _organizations: OrganizationRef[] = [],
        private _platforms: VideogamePlatform[] = [],
        private _actors: Actor[] = [],
    ) {
        super()
    }

    get organizations() {
        return this._organizations
    }

    get id() {
        return this._id
    }

    get title() {
        return this._title
    }

    get synopsis() {
        return this._synopsis
    }

    get release() {
        return this._release
    }

    get creator() {
        return this._creator
    }

    get type() {
        return this._type
    }

    get actors() {
        return this._actors
    }

    get platforms() {
        return this._platforms
    }

    get basedOn() {
        return this._basedOn
    }
}
