import { Column, PrimaryColumn } from 'typeorm'

export abstract class Media {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'date',
    })
    release: Date
    @Column({
        type: 'varchar',
    })
    productor: string
    @Column({
        type: 'varchar',
    })
    creator: string
    @Column({
        type: 'varchar',
    })
    title: string
}
