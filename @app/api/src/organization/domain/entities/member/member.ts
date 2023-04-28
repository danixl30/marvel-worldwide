import { Entity } from 'src/core/domain/entity/entity'
import { MemberCharge } from './value-objects/member.charge'
import { MemberId } from './value-objects/member.id'

export class Member extends Entity<MemberId> {
    constructor(id: MemberId, private _charge: MemberCharge) {
        super(id)
    }

    get charge() {
        return this._charge
    }
}
