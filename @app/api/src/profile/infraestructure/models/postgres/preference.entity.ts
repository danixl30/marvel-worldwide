import { MediaType } from 'src/profile/domain/entities/preference/value-objects/target'
import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class Preference {
    @PrimaryColumn({
        type: 'uuid',
    })
    id: string
    @ManyToOne(() => Profile)
    @JoinTable({
        name: 'id',
    })
    profile: Profile
    @Column({
        type: 'uuid',
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
