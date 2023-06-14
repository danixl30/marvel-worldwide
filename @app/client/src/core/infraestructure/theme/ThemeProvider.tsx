import { NextUIProvider, createTheme } from '@nextui-org/react'
import { ReactNode } from 'react'

type ThemeProviderProps = {
    children: ReactNode | ReactNode[]
}

const theme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            // brand colors
            primaryLight: '$yellow200',
            primaryLightHover: '$yellow300',
            primaryLightActive: '$yellow400',
            primaryLightContrast: '$yellow600',
            primary: '#ffbd17',
            secondary: '#ff7017',
            titleColor:
                'linear-gradient(90deg, rgba(237,183,0,1) 0%, rgba(238,108,8,1) 100%)',
            titleColor2:
                'linear-gradient(90deg, rgba(237,111,0,1) 0%, rgba(238,31,8,1) 100%)',
            redError: '#fa0707',
            primaryBorder: '$yellow500',
            primaryBorderHover: '$yellow600',
            primarySolidHover: '$yellow700',
            primarySolidContrast: '$white',
            primaryShadow: '$yellow500',

            gradient:
                'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#5E1DAD',
        },
        space: {},
        fonts: {},
    },
})

export default function ThemeProvider(props: ThemeProviderProps) {
    return (
        <>
            <NextUIProvider theme={theme}>{props.children}</NextUIProvider>
        </>
    )
}
