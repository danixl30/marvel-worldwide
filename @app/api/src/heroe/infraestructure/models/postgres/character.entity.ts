import { Column, PrimaryColumn } from 'typeorm'

export abstract class Character {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'uuid',
    })
    personId: string
}
