import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Optional } from '@mono/types-utils'
import { ValueObject } from 'src/core/domain/value-objects/value.object'

export interface Repository<
    I extends ValueObject<I>,
    T extends AggregateRoot<I>,
> {
    save(aggregate: T): Promise<void>
    delete(aggregate: T): Promise<void>
    getById(id: I): Promise<Optional<T>>
}
