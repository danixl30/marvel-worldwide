import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { CreationPlace } from './value-objects/creation.place'
import { FirstAparition } from './value-objects/first.aparition'
import { Headquarter } from './entities/headquarter/hearquarter'
import { InvalidOrganizationException } from './exceptions/invalid.organization'
import { Member } from './entities/member/member'
import { MemberId } from './entities/member/value-objects/member.id'
import { OrganizationCreatedEvent } from './events/organization.created'
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
        this.publish(
            new OrganizationCreatedEvent(
                id,
                this.name,
                this.objetive,
                this.slogan,
                this.leader,
                this.headquarter,
                this.founder,
                this.creationPlace,
                this.members,
                this.firstApparition,
            ),
        )
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

    changeName(name: OrganizationName) {
        this._name = name
    }

    changeObjetive(objetive: OrganizationObjetive) {
        this._objetive = objetive
    }

    changeFirstApparition(apparition: FirstAparition) {
        this._firstApparition = apparition
    }

    changeSlogan(slogan: Slogan) {
        this._slogan = slogan
    }

    changeLeader(leader: OrganizationLeader) {
        this._leader = leader
    }

    changeHeadQuarter(headquarter: Headquarter) {
        this._headquarter = headquarter
    }

    changeCreationPlace(creationPlace: CreationPlace) {
        this._creationPlace = creationPlace
    }

    addMember(member: Member) {
        if (this.members.find((e) => e.equals(member.id))) throw new Error('Member already exist')
        if (this.members.find((e) => e.charge.equals(member.charge))) throw new Error('Charge already exist')
        this._members.push(member)
    }

    removeMember(member: MemberId) {
        this._members = this.members.filter((e) => e.id.equals(member))
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
