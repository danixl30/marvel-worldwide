import { Optional } from '@mono/types-utils'
import { ProfileRepository } from 'src/profile/application/repositories/profile.repository'
import { History } from 'src/profile/domain/entities/history/history'
import { HistoryTarget } from 'src/profile/domain/entities/history/value-objects/target'
import { Profile } from 'src/profile/domain/profile'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { Profile as ProfileDB } from '../models/postgres/profile.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { History as HistoryDB } from '../models/postgres/history.entity'
import { Calification } from '../models/postgres/calification.entity'
import { ProfileEmail } from 'src/profile/domain/value-objects/profile.email'
import { ProfileLanguage } from 'src/profile/domain/value-objects/profile.language'
import { Preference as PreferenceDB } from '../models/postgres/preference.entity'
import { Preference } from 'src/profile/domain/entities/preference/preference'
import { PreferenceId } from 'src/profile/domain/entities/preference/value-objects/id'
import { PreferenceTarget } from 'src/profile/domain/entities/preference/value-objects/target'
import { HistoryId } from 'src/profile/domain/entities/history/value-objects/id'
import { HistoryTimestamp } from 'src/profile/domain/entities/history/value-objects/timestamp'
import { HistoryEnd } from 'src/profile/domain/entities/history/value-objects/end'
import { Rate } from 'src/profile/domain/entities/rate/rate'
import { RateId } from 'src/profile/domain/entities/rate/value-objects/rate.id'
import { RateKind } from 'src/profile/domain/entities/rate/value-objects/rate.kind'
import { RateCalification } from 'src/profile/domain/entities/rate/value-objects/rate.calification'
import { RateTimestamp } from 'src/profile/domain/entities/rate/value-objects/rate.timestamp'
import { Injectable } from '@nestjs/common'
import { Membership } from 'src/user/infraestructure/models/postgres/membership.entity'
import { UserTypes } from 'src/user/model/user'

@Injectable()
export class ProfilePostgresRepository implements ProfileRepository {
    constructor(
        @InjectRepository(ProfileDB)
        private readonly profileDB: Repository<ProfileDB>,
        @InjectRepository(PreferenceDB)
        private readonly preferenceDB: Repository<PreferenceDB>,
        @InjectRepository(HistoryDB)
        private readonly historyDB: Repository<HistoryDB>,
        @InjectRepository(Calification)
        private readonly calificationDB: Repository<Calification>,
        @InjectRepository(Membership)
        private readonly membershipDB: Repository<Membership>,
    ) {}
    async save(aggregate: Profile): Promise<void> {
        this.profileDB.upsert(
            this.profileDB.create({
                id: aggregate.id.value,
                email: aggregate.email.value,
                language: aggregate.language.value,
            }),
            ['id'],
        )
        await this.historyDB.delete({
            idProfile: aggregate.id.value,
        })
        await this.calificationDB.delete({
            idProfile: aggregate.id.value,
        })
        await this.preferenceDB.delete({
            idProfile: aggregate.id.value,
        })
        await aggregate.history.asyncMap((e) =>
            this.historyDB.insert(
                this.historyDB.create({
                    id: e.id.value,
                    endDate: e.end?.value,
                    initDate: e.timestamp.value,
                    idProfile: aggregate.id.value,
                    idMedia: e.target.postId,
                    mediaKind: e.target.kind,
                    device: '',
                }),
            ),
        )
        await this.calificationDB.save(
            aggregate.rates.map((e) => ({
                id: e.id.value,
                rating: e.calification.value,
                idMedia: e.id.value,
                timestamp: e.timestamp.value,
            })),
        )
        await this.preferenceDB.save(
            aggregate.preferences.map((e) => ({
                id: e.id.value,
                idProfile: aggregate.id.value,
                typeMedia: e.target.platform,
                subPreference: e.target.kind,
            })),
        )
    }

    async delete(aggregate: Profile): Promise<void> {
        await this.historyDB.delete({
            idProfile: aggregate.id.value,
        })
        await this.calificationDB.delete({
            idProfile: aggregate.id.value,
        })
        await this.preferenceDB.delete({
            idProfile: aggregate.id.value,
        })
        await this.profileDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: ProfileId): Promise<Optional<Profile>> {
        const profile = await this.profileDB.findOneBy({
            id: id.value,
        })
        if (!profile) return null
        const history = await this.historyDB.findBy({
            idProfile: id.value,
        })
        const preferences = await this.preferenceDB.findBy({
            idProfile: id.value,
        })
        const califications = await this.calificationDB.findBy({
            idProfile: id.value,
        })
        return new Profile(
            id,
            new ProfileEmail(profile.email),
            new ProfileLanguage(profile.language),
            preferences.map(
                (e) =>
                    new Preference(
                        new PreferenceId(e.id),
                        new PreferenceTarget(e.typeMedia, e.subPreference),
                    ),
            ),
            history.map(
                (e) =>
                    new History(
                        new HistoryId(e.id),
                        new HistoryTarget(e.idMedia, e.mediaKind),
                        new HistoryTimestamp(e.initDate),
                        e.endDate ? new HistoryEnd(e.endDate) : undefined,
                    ),
            ),
            califications.map(
                (e) =>
                    new Rate(
                        new RateId(e.id),
                        new RateKind(e.idMedia),
                        new RateCalification(e.rating),
                        new RateTimestamp(e.timestamp),
                    ),
            ),
        )
    }

    async getTop10History(id: ProfileId): Promise<History[]> {
        const histories = await this.historyDB
            .createQueryBuilder()
            .take(10)
            .addOrderBy('timestamp', 'ASC')
            .andWhere({
                idProfile: id.value,
            })
            .getMany()
        return histories.map(
            (e) =>
                new History(
                    new HistoryId(e.id),
                    new HistoryTarget(e.idMedia, e.mediaKind),
                    new HistoryTimestamp(e.initDate),
                    e.endDate ? new HistoryEnd(e.endDate) : undefined,
                ),
        )
    }
    async getProfileHistory(id: ProfileId): Promise<History[]> {
        const histories = await this.historyDB
            .createQueryBuilder()
            .addOrderBy('timestamp', 'ASC')
            .andWhere({
                idProfile: id.value,
            })
            .getMany()
        return histories.map(
            (e) =>
                new History(
                    new HistoryId(e.id),
                    new HistoryTarget(e.idMedia, e.mediaKind),
                    new HistoryTimestamp(e.initDate),
                    e.endDate ? new HistoryEnd(e.endDate) : undefined,
                ),
        )
    }

    async getTop5ContentPrimiumVIP(): Promise<{ target: HistoryTarget }[]> {
        const membershipVIPPremium = await this.membershipDB
            .createQueryBuilder()
            .orWhere({
                type: UserTypes.VIP,
            })
            .orWhere({
                type: UserTypes.PREMIUM,
            })
            .getMany()
        const profiles = await this.profileDB
            .createQueryBuilder()
            .orWhere(
                membershipVIPPremium.map((e) => ({
                    userId: e.userId,
                })),
            )
            .getMany()
        const histories = await this.historyDB
            .createQueryBuilder()
            .limit(5)
            .orderBy('endDate', 'ASC')
            .orWhere(
                profiles.map((e) => ({
                    idProfile: e.id,
                })),
            )
            .getMany()
        return histories.map((e) => ({
            target: new HistoryTarget(e.idMedia, e.mediaKind),
        }))
    }
}
