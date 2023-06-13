import {
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm'
import { Media } from './media.entity'

@Entity()
@Check('"productionCost" > 0')
@Check('"earning" > 0')
export class Movie {
    @ManyToOne(() => Media)
    @JoinColumn({
        name: 'id',
    })
    media: Media
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
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
    })
    durationH: number
    @Column({
        type: 'integer',
    })
    durationM: number
    @Column({
        type: 'integer',
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
