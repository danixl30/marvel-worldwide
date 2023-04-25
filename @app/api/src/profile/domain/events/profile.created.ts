import { DomainEvent } from 'src/core/domain/events/event'
import { History } from '../entities/history/history'
import { Preference } from '../entities/preference/preference'
import { ProfileEmail } from '../value-objects/profile.email'
import { ProfileId } from '../value-objects/profile.id'
import { ProfileLanguage } from '../value-objects/profile.language'
import { Rate } from '../entities/rate/rate'

export class ProfileCreatedEvent extends DomainEvent {
    constructor(
        private _id: ProfileId,
        private _email: ProfileEmail,
        private _language: ProfileLanguage,
        private _preferences: Preference[],
        private _history: History[] = [],
        private _rates: Rate[] = [],
    ) {
        super()
    }

    get id() {
        return this._id
    }

    get email() {
        return this._email
    }

    get language() {
        return this._language
    }

    get preferences() {
        return this._preferences
    }

    get history() {
        return this._history
    }

    get rates() {
        return this._rates
    }
}
