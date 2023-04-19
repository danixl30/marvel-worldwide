import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CreationPlace } from './value-objects/creation.place'
import { FirstAparition } from './value-objects/first.aparition'
import { Headquarter } from './entities/headquarter/hearquarter'
import { InvalidOrganizationException } from './exceptions/invalid.organization'
import { Member } from './entities/member/member'
import { OrganizationFounder } from './value-objects/founder'
import { OrganizationId } from './value-objects/organization.id'
import { OrganizationLeader } from './value-objects/leader'
import { OrganizationName } from './value-objects/name'
import { OrganizationObjetive } from './value-objects/objetive'
import { Slogan } from './value-objects/slogan'

export class Organization extends AggregateRoot<OrganizationId> {
    constructor(
        id: OrganizationId,
        private _name: OrganizationName,
        private _objetive: OrganizationObjetive,
        private _slogan: Slogan,
        private _leader: OrganizationLeader,
        private _headquarter: Headquarter,
        private _founder: OrganizationFounder,
        private _creationPlace: CreationPlace,
        private _members: Member[],
        private _firstApparition: FirstAparition,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get objetive() {
        return this._objetive
    }

    get slogan() {
        return this._slogan
    }

    get leader() {
        return this._leader
    }

    get headquarter() {
        return this._headquarter
    }

    get founder() {
        return this._founder
    }

    get creationPlace() {
        return this._creationPlace
    }

    get members() {
        return this._members
    }

    get firstApparition() {
        return this._firstApparition
    }

    validateState(): void {
        if (
            !this.id ||
            !this.name ||
            !this.firstApparition ||
            !this.creationPlace ||
            !this.headquarter ||
            !this.slogan ||
            !this.leader ||
            !this.objetive ||
            !this.members
        )
            throw new InvalidOrganizationException()
    }
}
