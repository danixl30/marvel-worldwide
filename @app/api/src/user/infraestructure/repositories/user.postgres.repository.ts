import { Optional } from '@mono/types-utils'
import { UserRepository } from 'src/user/application/repositories/user.repository'
import { User } from 'src/user/model/user'
import { User as UserDB } from '../models/postgres/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Membership as MemberDB } from '../models/postgres/membership.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserPostgresRepository implements UserRepository {
    constructor(
        @InjectRepository(UserDB) private readonly userDb: Repository<UserDB>,
        @InjectRepository(MemberDB)
        private readonly membershipDb: Repository<MemberDB>,
    ) {}
    async save(user: User): Promise<void> {
        const possibleUser = await this.userDb.findOneBy({
            id: user.id,
        })
        if (!possibleUser) {
            this.userDb.create({
                id: user.id,
                password: user.password,
                dob: user.birthDate,
                email: user.email,
                cardNumber: user.cardNumber,
            })
            this.membershipDb.create({
                ...user.membreship,
            })
            return
        }
        possibleUser.cardNumber = user.cardNumber
        possibleUser.email = user.email
        possibleUser.password = user.password
        possibleUser.dob = user.birthDate
        this.userDb.update(
            {
                id: user.id,
            },
            possibleUser,
        )
        const membership = await this.membershipDb.findOneBy({
            userId: user.id,
        })
        if (membership?.id === user.membreship.id) return
        await this.membershipDb.delete({
            userId: user.id,
        })
        this.membershipDb.create(user.membreship)
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
        if (!memberships) throw new Error('membership not found')
        return {
            id,
            email: userFound.email,
            cardNumber: userFound.cardNumber,
            birthDate: userFound.dob,
            password: userFound.password,
            membreship: {
                ...memberships,
            },
            profiles: [],
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
        if (!memberships) throw new Error('membership not found')
        return {
            id: userFound.id,
            email: userFound.email,
            cardNumber: userFound.cardNumber,
            birthDate: userFound.dob,
            password: userFound.password,
            membreship: {
                ...memberships,
            },
            profiles: [],
        }
    }
}
