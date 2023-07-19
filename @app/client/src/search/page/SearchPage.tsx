import {
    Button,
    Card,
    Container,
    Dropdown,
    Grid,
    Image,
    Input,
    Row,
    Spacer,
    Text,
} from '@nextui-org/react'
import { civilHttpRepository } from '../../civil/infraestructure/repositories/civil.http.repository'
import { combatHttpRepository } from '../../combat/infraestructure/repositories/combat.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { createInputManager } from '../../core/infraestructure/input-manager/useInputManager'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { usePaginationManager } from '../../core/infraestructure/pagination-manager/usePaginationManager'
import { useRouterDomNavigation } from '../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { heroeHttpRepository } from '../../heroe/infraestructure/repositories/heroe.http.repository'
import { movieHttpRepository } from '../../movie/infraestructure/repositories/movie.http.repository'
import { organizationHttpRepository } from '../../organization/infraestructure/repositories/organization.http.repository'
import { serieHttpRepository } from '../../serie/infraestructure/repositories/serie.http.repository'
import { videogameHttpRepository } from '../../videogames/infraestructure/repositories/videogame.http.repository'
import { villainHttpRepository } from '../../villain/infraestructure/repositories/villain.http.repository'
import { getCivilsByCriteriaApplicationService } from '../application/get.civils.criteria'
import { getCombatsByCriteriaApplicationService } from '../application/get.combats.criteria'
import { getHeroesByCriteriaApplicationService } from '../application/get.heroes.criteria'
import { getMoviesByCriteriaApplicationService } from '../application/get.movies.criteria'
import { getOrganizationsByCriteriaApplicationService } from '../application/get.organizations.criteria'
import { getSeriesByCriteriaApplicationService } from '../application/get.series.criteria'
import { getVideogamesByCriteriaApplicationService } from '../application/get.videogames.criteria'
import { getVillainsByCriteriaApplicationService } from '../application/get.villains.criteria'
import { searchLogic } from '../logic/search.logic'
import ReactStars from 'react-rating-star-with-type'

export default function SearchPage() {
    const stateFactory = useRefStateFactory()
    const currentSearch = stateFactory('movie')
    const {
        submitSearch,
        searchInput,
        civilData,
        increaseCivil,
        isTopCivil,
        errorCivil,
        combatData,
        combatIncrease,
        combatIsTop,
        combatError,
        movieData,
        movieIncrease,
        movieIsTop,
        movieError,
        heroeData,
        heroeIncrease,
        heroeIsTop,
        heroeError,
        organizationData,
        organizationIncrease,
        organizationIsTop,
        organizationError,
        serieData,
        serieIncrease,
        serieIsTop,
        serieError,
        videogameData,
        videogameIncrease,
        videogameIsTop,
        videogameError,
        villainData,
        villainIncrease,
        villainIsTop,
        villainError,
        onClickCivil,
        onClickCombat,
        onClickHeroe,
        onClickMovie,
        onClickOrganization,
        onClickSerie,
        onClickVideogame,
        onClickVillain,
    } = searchLogic(
        usePaginationManager(
            stateFactory,
            useEffectStateObserver,
            useEffectOnInit,
        ),
        createInputManager(stateFactory),
        useRouterDomNavigation(),
        getCivilsByCriteriaApplicationService(
            civilHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getCombatsByCriteriaApplicationService(
            combatHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getHeroesByCriteriaApplicationService(
            heroeHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getMoviesByCriteriaApplicationService(
            movieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getOrganizationsByCriteriaApplicationService(
            organizationHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getSeriesByCriteriaApplicationService(
            serieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getVideogamesByCriteriaApplicationService(
            videogameHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getVillainsByCriteriaApplicationService(
            villainHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
    )
    return (
        <>
            <Container>
                <Spacer />
                <Spacer />
                <Row>
                    <Input
                        value={searchInput.value.value}
                        onChange={(e) => searchInput.onChange(e.target.value)}
                        placeholder="Term to search"
                    />
                    <Spacer />
                    <Button onPress={submitSearch}>Search</Button>
                    <Spacer />
                    <Dropdown>
                        <Dropdown.Button>
                            {currentSearch.state.value}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Static Actions"
                            onSelectionChange={(keys) =>
                                currentSearch.setState(
                                    Array.from(keys as Set<string>)[0],
                                )
                            }
                            selectionMode="single"
                            selectedKeys={[currentSearch.state.value]}
                        >
                            <Dropdown.Item key={'movie'}>Movie</Dropdown.Item>
                            <Dropdown.Item key={'serie'}>Serie</Dropdown.Item>
                            <Dropdown.Item key={'videogame'}>
                                Videogame
                            </Dropdown.Item>
                            <Dropdown.Item key={'heroe'}>Heroe</Dropdown.Item>
                            <Dropdown.Item key={'civil'}>Civil</Dropdown.Item>
                            <Dropdown.Item key={'villain'}>
                                Villain
                            </Dropdown.Item>
                            <Dropdown.Item key={'combat'}>Combat</Dropdown.Item>
                            <Dropdown.Item key={'organization'}>
                                Organization
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Spacer />
                <Grid.Container gap={2} justify="center">
                    {currentSearch.state.value === 'movie' && (
                        <>
                            {movieData.value.map((movie) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={() => onClickMovie(movie.id)}
                                    >
                                        <Text h4>{movie.title}</Text>
                                        <Text>{movie.synopsis}</Text>
                                        <ReactStars
                                            isEdit={false}
                                            value={movie.rating}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                            {!movieIsTop.value && (
                                <Button onPress={movieIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'serie' && (
                        <>
                            {serieData.value.map((serie) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={() => onClickSerie(serie.id)}
                                    >
                                        <Text h4>{serie.title}</Text>
                                        <Text>{serie.synopsis}</Text>
                                        <Text>Episodes: {serie.episodes}</Text>
                                        <ReactStars
                                            isEdit={false}
                                            value={serie.rating}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                            {!serieIsTop.value && (
                                <Button onPress={serieIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'videogame' && (
                        <>
                            {videogameData.value.map((videogame) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={() =>
                                            onClickVideogame(videogame.id)
                                        }
                                    >
                                        <Text h4>{videogame.title}</Text>
                                        <Text>{videogame.synopsis}</Text>
                                        <ReactStars
                                            isEdit={false}
                                            value={videogame.rating}
                                        />
                                        <Spacer />
                                        {videogame.platforms.map((platform) => (
                                            <Text h6>{platform}</Text>
                                        ))}
                                    </Card>
                                </Grid>
                            ))}
                            {!videogameIsTop.value && (
                                <Button onPress={videogameIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'heroe' && (
                        <>
                            {heroeData.value.map((heroe) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginLeft: 20,
                                        }}
                                        key={heroe.id}
                                        isPressable
                                        isHoverable
                                        onPress={() => onClickHeroe(heroe.id)}
                                    >
                                        <Image
                                            width={100}
                                            src="https://static.thenounproject.com/png/380874-200.png"
                                        />
                                        <Text h4>Name: {heroe.name}</Text>
                                    </Card>
                                </Grid>
                            ))}
                            {!heroeIsTop.value && (
                                <Button onPress={heroeIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'villain' && (
                        <>
                            {villainData.value.map((villain) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        key={villain.id}
                                        isPressable
                                        isHoverable
                                        onPress={() =>
                                            onClickVillain(villain.id)
                                        }
                                    >
                                        <Image
                                            width={100}
                                            src="https://static.thenounproject.com/png/2975528-200.png"
                                        />
                                        <Text h4>Name: {villain.name}</Text>
                                    </Card>
                                </Grid>
                            ))}
                            {!villainIsTop.value && (
                                <Button onPress={villainIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'civil' && (
                        <>
                            {civilData.value.map((civil) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={() => onClickCivil(civil.id)}
                                    >
                                        <Text h4>
                                            Name:
                                            {civil.name.firstName +
                                                ' ' +
                                                civil.name.lastName}
                                        </Text>
                                    </Card>
                                </Grid>
                            ))}
                            {!isTopCivil.value && (
                                <Button onPress={increaseCivil}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'combat' && (
                        <>
                            {combatData.value.map((combat) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={() => onClickCombat(combat.id)}
                                    >
                                        <Text h4>Place: {combat.place}</Text>
                                        <Text h6>
                                            Date:{' '}
                                            {new Date(combat.date)
                                                .toISOString()
                                                .split('T')
                                                .at(0)}
                                        </Text>
                                    </Card>
                                </Grid>
                            ))}
                            {!combatIsTop.value && (
                                <Button onPress={combatIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                    {currentSearch.state.value === 'organization' && (
                        <>
                            {organizationData.value.map((organization) => (
                                <Grid xs={4}>
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={() =>
                                            onClickOrganization(organization.id)
                                        }
                                    >
                                        <Text h4>{organization.name}</Text>
                                        <Text>{organization.objetive}</Text>
                                    </Card>
                                </Grid>
                            ))}
                            {!organizationIsTop.value && (
                                <Button onPress={organizationIncrease}>
                                    Get more
                                </Button>
                            )}
                        </>
                    )}
                </Grid.Container>
            </Container>
        </>
    )
}
