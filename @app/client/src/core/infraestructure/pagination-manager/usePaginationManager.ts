import { OnInit } from '../../application/on-init/on-init'
import { Optional } from '@mono/types-utils'
import { PaginationManager } from '../../application/pagination-manager/pagination-manager'
import { StateFactory } from '../../application/state/state-factory'
import { StateObserver } from '../../application/state-observers/state-observer'
import { normalDataTransform } from './data-transforms/normal'

export const usePaginationManager =
    (
        stateFactory: StateFactory,
        stateObserver: StateObserver,
        onInit: OnInit,
    ): PaginationManager =>
    <T>(
        callback: (page: number) => Promise<T[]>,
        dataTransform: (res: T[], prev: T[]) => T[] = normalDataTransform<T>(),
    ) => {
        const pageState = stateFactory<number>(1)
        const dataState = stateFactory<T[]>([])
        const errorState = stateFactory<Optional<Error>>(null)
        const loadingState = stateFactory<boolean>(false)
        const isTopState = stateFactory(false)

        const job = async () => {
            if (loadingState.state.value) return
            loadingState.setState(true)
            errorState.setState(null)
            try {
                const data = await callback(pageState.state.value)
                if (data.isEmpty()) isTopState.setState(true)
                dataState.setState(dataTransform(data, dataState.state.value))
            } catch (e) {
                errorState.setState(e as Error)
            }
            loadingState.setState(false)
        }

        onInit(() => {
            job()
        })

        stateObserver(() => {
            job()
        }, pageState.state)

        const increment = () => pageState.setState(pageState.state.value + 1)

        const reset = () => {
            isTopState.setState(false)
            dataState.setState([])
            pageState.setState(1)
            job()
        }

        const previousPage = () => {
            isTopState.setState(false)
            if (pageState.state.value > 2)
                pageState.setState(pageState.state.value - 1)
        }

        const setPage = (page: number) => {
            isTopState.setState(false)
            if (page < 1 || Math.ceil(page) !== page)
                throw new Error('Invalid page')
            pageState.setState(page)
        }

        const mutate = (callback: (data: T[]) => T[]) => {
            dataState.setState(callback(dataState.state.value))
        }

        return {
            data: dataState.state,
            error: errorState.state,
            isLoading: loadingState.state,
            increment,
            reset,
            page: pageState.state,
            previousPage,
            setPage,
            isTop: isTopState.state,
            mutate,
        }
    }
