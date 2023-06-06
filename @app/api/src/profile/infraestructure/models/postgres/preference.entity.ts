import { MediaType } from 'src/profile/domain/entities/preference/value-objects/target'
import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class Preference {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @Column({
        type: 'uuid',
    })
    @ManyToOne(() => Profile)
    @JoinTable({
        name: 'id',
    })
    idProfile: string
    @Column({
        type: 'enum',
        enum: MediaType,
    })
    typeMedia: MediaType
    @Column({
        type: 'varchar',
    })
    subPreference: string
}
