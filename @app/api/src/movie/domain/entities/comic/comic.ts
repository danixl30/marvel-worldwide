import { Entity } from 'src/core/domain/entity/entity'
import { ComicId } from './value-objects/id'
import { ComicTitle } from './value-objects/title'
import { ComicAuthor } from './value-objects/author'
import { ComicVolumen } from './value-objects/volumen'

export class Comic extends Entity<ComicId> {
    constructor(
        id: ComicId,
        private _title: ComicTitle,
        private _author: ComicAuthor,
        private _volumen: ComicVolumen,
    ) {
        super(id)
    }

    get title() {
        return this._title
    }

    get author() {
        return this._author
    }

    get volumen() {
        return this._volumen
    }
}
