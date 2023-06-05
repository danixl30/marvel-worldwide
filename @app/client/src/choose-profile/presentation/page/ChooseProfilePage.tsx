import {
    Card,
    Container,
    Row,
    Spacer,
    Text,
    Image,
    Col,
} from '@nextui-org/react'
import { chooseProfileLogic } from '../logic/chooseProfileLogic'
import { useRouterDomNavigation } from '../../../core/infraestructure/router/router-dom/react-router-dom-navigation'

const profiles = [
    {
        id: 1,
        email: 'test@mail.com',
    },
    {
        id: 2,
        email: 'test@mail.com',
    },
    {
        id: 3,
        email: 'test@mail.com',
    },
    {
        id: 4,
        email: 'test@mail.com',
    },
    {
        id: 5,
        email: 'test@mail.com',
    },
]

export default function ChooseProfilePage() {
    const { addProfile } = chooseProfileLogic(useRouterDomNavigation())
    return (
        <>
            <Container>
                <Row align="center" justify="center">
                    <Text h1 size={50}>
                        Choose a Profile
                    </Text>
                </Row>
                <Row align="center" justify="center">
                    <Spacer x={2} />
                    <Card css={{ padding: 30, alignItems: 'center' }}>
                        <Row
                            css={{ marginInline: 60, width: 500 }}
                            align="center"
                            justify="center"
                        >
                            {profiles.map((e) => (
                                <>
                                    <Col key={e.id}>
                                        <Card
                                            isHoverable
                                            isPressable
                                            css={{
                                                padding: 30,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Image
                                                width={110}
                                                src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png"
                                            />
                                            <Text h4>{e.email}</Text>
                                        </Card>
                                    </Col>
                                    <Spacer x={1} />
                                </>
                            ))}
                            <Col>
                                <Card
                                    isHoverable
                                    isPressable
                                    onPress={addProfile}
                                    css={{
                                        padding: 30,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        width={80}
                                        src="https://e7.pngegg.com/pngimages/535/334/png-clipart-computer-icons-add-button-logo-number-thumbnail.png"
                                    />
                                    <Text h4>Add</Text>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                    <Spacer x={2} />
                </Row>
            </Container>
        </>
    )
}
