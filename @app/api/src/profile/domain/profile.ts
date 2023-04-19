import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { History } from './entities/history/history'
import { HistoryAddedEvent } from './events/history.added'
import { HistoryEndedEvent } from './events/history.ended'
import { HistoryId } from './entities/history/value-objects/id'
import { HistoryNotExistException } from './exceptions/history.not.exist'
import { InvalidProfileException } from './exceptions/invalid.profile'
import { Preference } from './entities/preference/preference'
import { ProfileCreatedEvent } from './events/profile.created'
import { ProfileEmail } from './value-objects/profile.email'
import { ProfileId } from './value-objects/profile.id'
import { ProfileLanguage } from './value-objects/profile.language'
import { ProfileUser } from './value-objects/profile.user'
import { Rate } from './entities/rate/rate'

export class Profile extends AggregateRoot<ProfileId> {
    constructor(
        id: ProfileId,
        private _email: ProfileEmail,
        private _language: ProfileLanguage,
        private _user: ProfileUser,
        private _preferences: Preference[],
        private _history: History[] = [],
        private _rates: Rate[] = [],
    ) {
        super(id)
        this.publish(
            new ProfileCreatedEvent(
                id,
                this.email,
                this.language,
                this.user,
                this.preferences,
                this.history,
                this.rates,
            ),
        )
    }

    get email() {
        return this._email
    }

    get language() {
        return this._language
    }

    get user() {
        return this._user
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

    addHistory(history: History) {
        this._history.push(history)
        this.publish(new HistoryAddedEvent(this.id, history))
    }

    endHistory(historyId: HistoryId) {
        const history = this.history.find((e) => e.id.equals(historyId))
        if (!history) throw new HistoryNotExistException()
        history.endHistory()
        this.publish(new HistoryEndedEvent(this.id, history))
    }

    validateState(): void {
        if (
            !this.id ||
            !this.email ||
            !this.language ||
            !this.history ||
            !this.user ||
            !this.rates ||
            !this.preferences
        )
            throw new InvalidProfileException()
    }
}
