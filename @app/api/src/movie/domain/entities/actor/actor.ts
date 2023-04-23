import { ActorCharacter } from './value-objects/actor.character'
import { ActorId } from './value-objects/actor.id'
import { ActorName } from './value-objects/actor.name'
import { ActorRole } from './value-objects/actor.role'
import { Entity } from 'src/core/domain/entity/entity'

export class Actor extends Entity<ActorId> {
    constructor(
        id: ActorId,
        private _name: ActorName,
        private _character: ActorCharacter,
        private _role: ActorRole,
    ) {
        super(id)
    }

    get name() {
        return this._name
    }

    get character() {
        return this._character
    }

    get role() {
        return this._role
    }

    changeName(name: ActorName) {
        this._name = name
    }

    changeCharacter(character: ActorCharacter) {
        this._character = character
    }

    changeRole(role: ActorRole) {
        this._role = role
    }
}
