import {
    Button,
    Container,
    Input,
    Link,
    Navbar,
    Row,
    Spacer,
    Text,
    User,
} from '@nextui-org/react'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import MovieHome from '../subpages/movie/page/MovieHome'
import SerieHome from '../subpages/serie/page/SerieHome'
import VidegameHome from '../subpages/videogame/page/VideogameHome'
import { homeLogic } from '../logic/home.logic'
import { createInputManager } from '../../core/infraestructure/input-manager/useInputManager'
import { useRouterDomNavigation } from '../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { getUserState } from '../../global-state/user/UserContext'
import { CREATE_CIVIL } from '../../create-civil/page/page'
import { CREATE_HEROE } from '../../create-heroe/page/page'
import { CREATE_VILLAIN } from '../../create-villain/page/page'
import { CREATE_MOVIE } from '../../create-movie/page/page'
import { CREATE_SERIE } from '../../create-serie/page/page'
import { CREATE_VIDEOGAME } from '../../create-videogame/page/page'
import { CREATE_COMBAT } from '../../create-combat/page/page'
import { CREATE_ORGANIZATION } from '../../create-organization/page/page'
import { REPORTS_PAGE } from '../../reports/page/page'
import { CHOOSE_PROFILE } from '../../choose-profile/presentation/page/page'

const MOVIE = 'MOVIE'
const SERIE = 'SERIE'
const VIDEOGAME = 'VIDEOGAME'

export default function HomePage() {
    const userState = getUserState()
    console.log(userState)
    const stateManager = useRefStateFactory()
    const seccionState = stateManager(MOVIE)
    const navigation = useRouterDomNavigation()
    const { searchInput, submitSearch } = homeLogic(
        createInputManager(useRefStateFactory()),
        navigation,
    )
    return (
        <>
            <Navbar variant="sticky">
                <Navbar.Brand>
                    <Text b>Marvel worldwide</Text>
                </Navbar.Brand>
                <Navbar.Content>
                    <Navbar.Item>
                        <Input
                            placeholder="search"
                            value={searchInput.value.value}
                            onChange={(e) =>
                                searchInput.onChange(e.target.value)
                            }
                            onKeyPress={(e) => {
                                if (e.key !== 'Enter') return
                                submitSearch()
                            }}
                        />
                    </Navbar.Item>
                    <Navbar.Item>
                        <Button
                            bordered
                            shadow
                            onPress={() => seccionState.setState(MOVIE)}
                        >
                            Movies
                        </Button>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Button
                            bordered
                            shadow
                            onPress={() => seccionState.setState(SERIE)}
                        >
                            Series
                        </Button>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Button
                            onPress={() => seccionState.setState(VIDEOGAME)}
                            bordered
                            shadow
                        >
                            Videogames
                        </Button>
                    </Navbar.Item>
                    <Navbar.Item>
                        <User
                            name={userState.user.value?.email || ''}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORJrJqQvcLiMZE1_niVGLk-phpKQ2HowIkQ&usqp=CAU"
                            onClick={() => navigation.goTo(CHOOSE_PROFILE)}
                        />
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
            <Container>
                <Row align="center" justify="center">
                    <Text
                        h1
                        size={50}
                        css={{
                            background: '$titleColor2',
                            '-webkit-background-clip': 'text',
                            '-webkit-text-fill-color': 'transparent',
                        }}
                    >
                        Main page
                    </Text>
                </Row>
                {userState.user.value?.membreship.type === 'VIP' && (
                    <Row>
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_CIVIL)}
                        >
                            Create civil
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_HEROE)}
                        >
                            Create heroe
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_VILLAIN)}
                        >
                            Create villain
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_MOVIE)}
                        >
                            Create movie
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_SERIE)}
                        >
                            Create serie
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_VIDEOGAME)}
                        >
                            Create videogame
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_COMBAT)}
                        >
                            Create combat
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(CREATE_ORGANIZATION)}
                        >
                            Create organization
                        </Link>
                        <Spacer />
                        <Link
                            css={{ fontSize: 15, fontWeight: '$bold' }}
                            block
                            onPress={() => navigation.goTo(REPORTS_PAGE)}
                        >
                            Reports
                        </Link>
                    </Row>
                )}
            </Container>
            {seccionState.state.value === MOVIE && <MovieHome />}
            {seccionState.state.value === SERIE && <SerieHome />}
            {seccionState.state.value === VIDEOGAME && <VidegameHome />}
        </>
    )
}
