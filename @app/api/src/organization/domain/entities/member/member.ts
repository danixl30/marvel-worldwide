import { Entity } from 'src/core/domain/entity/entity'
import { MemberCharge } from './value-objects/member.charge'
import { MemberId } from './value-objects/member.id'
import { MemberName } from './value-objects/member.name'

export class Member extends Entity<MemberId> {
    constructor(id: MemberId, private _name: MemberName, private _charge: MemberCharge) {
        super(id)
    }

    get name() {
        return this._name
    }

    get charge() {
        return this._charge
    }
}
