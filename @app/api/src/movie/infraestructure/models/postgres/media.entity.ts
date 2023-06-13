import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Media {
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
    @Column({
        type: 'varchar',
    })
    synopsis: string
    @Column({
        type: 'varchar',
    })
    comic: string
    @Column({
        type: 'enum',
        enum: ['movie', 'serie', 'videogame'],
    })
    kind: string
}
