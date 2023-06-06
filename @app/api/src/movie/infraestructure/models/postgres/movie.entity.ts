import { Column, Entity } from 'typeorm'
import { Media } from './media.entity'

@Entity()
export class Movie extends Media {
    @Column({
        type: 'varchar',
    })
    distribuitor: string
    @Column({
        type: 'real',
    })
    productionCost: number
    @Column({
        type: 'real',
    })
    earning: number
    @Column({
        type: 'integer',
        length: 2,
    })
    durationH: number
    @Column({
        type: 'integer',
        length: 2,
    })
    durationM: number
    @Column({
        type: 'integer',
        length: 2,
    })
    durationS: number
    @Column({
        type: 'varchar',
    })
    director: string
    @Column({
        type: 'varchar',
    })
    type: string
}
