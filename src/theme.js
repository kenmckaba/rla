import { extendTheme } from '@chakra-ui/react'

// 37, 57, 94   25, 39, 5e
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
    brand: {
      50: '#E7F1FD',
      100: '#BDD7FA',
      200: '#92BDF7',
      300: '#67A3F4',
      400: '#3C89F1',
      500: '#1d6bdd',
      600: '#0E59BE',
      700: '#0B438E',
      800: '#072D5F',
      900: '#04162F',
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
