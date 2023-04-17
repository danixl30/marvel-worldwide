import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { ProfileId } from './value-objects/profile.id'
import { ProfileEmail } from './value-objects/profile.email'
import { ProfileLanguage } from './value-objects/profile.language'
import { ProfileUser } from './value-objects/profile.user'
import { Preference } from './entities/preference/preference'
import { History } from './entities/history/history'
import { Rate } from './entities/rate/rate'
import { HistoryId } from './entities/history/value-objects/id'

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
    }

    endHistory(historyId: HistoryId) {
        const history = this.history.find((e) => e.id.equals(historyId))
        history?.endHistory()
    }

    validateState(): void {}
}