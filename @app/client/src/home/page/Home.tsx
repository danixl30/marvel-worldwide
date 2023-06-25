import { Container, Row, Text } from '@nextui-org/react'

export default function HomePage() {
    return (
        <>
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
            </Container>
        </>
    )
}
