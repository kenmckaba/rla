import { extendTheme } from '@chakra-ui/react'

// 37, 57, 94   25, 39, 5e
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
    brand: {
      50: '#e3edff',
      100: '#b3c8ff',
      200: '#84a4fc',
      300: '#547ff7',
      400: '#255bf4',
      500: '#0b41da',
      600: '#0533ab',
      700: '#00247b',
      800: '#00164d',
      900: '#00071f',
    },
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: 'xs',
        mb: '0',
        mt: '1',
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
}

const theme = extendTheme(config)

export default theme
