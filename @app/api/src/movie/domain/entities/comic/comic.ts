import { Entity } from 'src/core/domain/entity/entity'
import { ComicAuthor } from './value-objects/author'
import { ComicId } from './value-objects/id'
import { ComicTitle } from './value-objects/title'
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

    changeTitle(title: ComicTitle) {
        this._title = title
    }

    changeAuthor(author: ComicAuthor) {
        this._author = author
    }

    changeVolumen(volumen: ComicVolumen) {
        this._volumen = volumen
    }
}
