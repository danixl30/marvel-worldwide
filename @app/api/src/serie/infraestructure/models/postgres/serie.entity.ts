import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'
import { serieTypes } from 'src/serie/domain/value-objects/type'
import {
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm'

@Entity()
@Check('"episodes" > 0')
export class Serie {
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
        type: 'integer',
    })
    episodes: number
    @Column({
        type: 'varchar',
    })
    channel: string
    @Column({
        type: 'enum',
        enum: serieTypes,
    })
    type: string
}
