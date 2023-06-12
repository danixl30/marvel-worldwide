import { Optional } from '@mono/types-utils'
import { UserRepository } from 'src/user/application/repositories/user.repository'
import { User } from 'src/user/model/user'
import { User as UserDB } from '../models/postgres/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Membership as MemberDB } from '../models/postgres/membership.entity'
import { Injectable } from '@nestjs/common'
import { Profile as ProfileDB } from 'src/profile/infraestructure/models/postgres/profile.entity'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

@Injectable()
export class UserPostgresRepository implements UserRepository {
    constructor(
        @InjectRepository(UserDB) private readonly userDb: Repository<UserDB>,
        @InjectRepository(MemberDB)
        private readonly membershipDb: Repository<MemberDB>,
        @InjectRepository(ProfileDB)
        private readonly profileDB: Repository<ProfileDB>,
    ) {}
    async save(user: User): Promise<void> {
        await this.userDb.upsert(
            this.userDb.create({
                id: user.id,
                password: user.password,
                dob: user.birthDate,
                email: user.email,
                cardNumber: user.cardNumber,
            }),
            ['id'],
        )
        await this.membershipDb.delete({
            userId: user.id,
        })
        await this.membershipDb.insert(
            this.membershipDb.create({
                ...user.membreship,
                userId: user.id,
                description: '',
            }),
        )
        if (user.profiles) {
            await user.profiles.asyncForEach((profile) =>
                this.profileDB.update(
                    {
                        id: profile.value,
                    },
                    {
                        userId: user.id,
                    },
                ),
            )
        }
    }

    async delete(id: string): Promise<void> {
        await this.membershipDb.delete({
            userId: id,
        })
        await this.userDb.delete({
            id,
        })
    }

    async getById(id: string): Promise<Optional<User>> {
        const userFound = await this.userDb.findOneBy({
            id,
        })
        if (!userFound) return null
        const memberships = await this.membershipDb.findOneBy({
            userId: id,
        })
        if (!memberships) return null
        const profiles = await this.profileDB.findBy({
            userId: userFound.id,
        })
        return {
            id,
            email: userFound.email,
            cardNumber: userFound.cardNumber,
            birthDate: userFound.dob,
            password: userFound.password,
            membreship: {
                ...memberships,
            },
            profiles: profiles.map((e) => new ProfileId(e.id)),
        }
    }

    async getByEmail(email: string): Promise<Optional<User>> {
        const userFound = await this.userDb.findOneBy({
            email,
        })
        if (!userFound) return null
        const memberships = await this.membershipDb.findOneBy({
            userId: userFound.id,
        })
        if (!memberships) return null
        const profiles = await this.profileDB.findBy({
            userId: userFound.id,
        })
        return {
            id: userFound.id,
            email: userFound.email,
            cardNumber: userFound.cardNumber,
            birthDate: userFound.dob,
            password: userFound.password,
            membreship: {
                ...memberships,
            },
            profiles: profiles.map((e) => new ProfileId(e.id)),
        }
    }
}
