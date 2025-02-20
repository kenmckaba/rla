import { extendTheme } from '@chakra-ui/react'
import Button from './components/button'
import Input from './components/input'
// 37, 57, 94   25, 39, 5e
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: 'Proxima Nova',
    body: 'Proxima Nova',
  },
  styles: {
    global: {
      body: {
        color: 'white',
      },
    },
  },
  colors: {
    blue: {
      50: '#f0f7ff',
      100: '#dff1fc',
      200: '#bbddf9',
      300: '#8dbcef',
      400: '#5f96e3',
      500: '#3774cd',
      600: '#0d62c5',
      700: '#2255a3',
      800: '#212b76',
      900: '#131b4b',
    },
    darkKnight: {
      50: '#f9faf8',
      100: '#f0f1f1',
      200: '#dddee0',
      300: '#b8bbbe',
      400: '#8b9394',
      500: '#6d716f',
      600: '#575652',
      700: '#4a4a4a',
      800: '#2d2b2c',
      900: '#1b1a1c',
    },
    martinGrey: {
      50: '#f7f9f8',
      100: '#eceff3',
      200: '#cbd2da',
      300: '#b1b9ca',
      400: '#8592a8',
      500: '#6a7188',
      600: '#56566c',
      700: '#434152',
      800: '#2f2d3a',
      900: '#1d1c25',
    },
    fogGrey: {
      50: '#f8f9f7',
      100: '#f2f3f5',
      200: '#dddae1',
      300: '#bbb7c0',
      400: '#948f9c',
      500: '#786f7b',
      600: '#62545f',
      700: '#4c3f49',
      800: '#352c34',
      900: '#211c21',
    },
    ghost: {
      50: '#f6f8fa',
      100: '#efeef0',
      200: '#dcdae1',
      300: '#bab7c1',
      400: '#938f9c',
      500: '#776f7c',
      600: '#615460',
      700: '#4c3f4a',
      800: '#342c34',
      900: '#211c22',
    },
    white: {
      50: '#ffffff',
      100: '#efeeef',
      200: '#ded9df',
      300: '#bdb6bd',
      400: '#988f98',
      500: '#7c6e77',
      600: '#65535c',
      700: '#4e3f47',
      800: '#372c32',
      900: '#221c20',
    },
    rose: {
      50: '#fdfcfb',
      100: '#fcf0ef',
      200: '#f9cbdf',
      300: '#f19cbf',
      400: '#f06b9a',
      500: '#e7477c',
      600: '#e01e5a',
      700: '#af2341',
      800: '#82192a',
      900: '#511016',
    },
    orange: {
      50: '#fcfbf7',
      100: '#faf0cf',
      200: '#f4da9f',
      300: '#e3b26a',
      400: '#d1853e',
      500: '#c85200',
      600: '#994a16',
      700: '#753713',
      800: '#50260f',
      900: '#33170a',
    },
    forrest: {
      50: '#f1f6f3',
      100: '#dbf0ea',
      200: '#ace7ce',
      300: '#70cc9f',
      400: '#2ead6e',
      500: '#1f9245',
      600: '#297c45',
      700: '#195f29',
      800: '#134121',
      900: '#0d271a',
    },
    neonRose: {
      50: '#fdfcfb',
      100: '#fcefef',
      200: '#f9c9df',
      300: '#f19abf',
      400: '#ffff33',
      500: '#e8477f',
      600: '#d62e5e',
      700: '#b22344',
      800: '#86192c',
      900: '#551017',
    },
    neonOrange: {
      50: '#fbf9f2',
      100: '#f8efac',
      200: '#ffb6b6',
      300: '#d8bb3f',
      400: '#b49220',
      500: '#93740f',
      600: '#775b0a',
      700: '#5b440a',
      800: '#3e2f09',
      900: '#2b1d07',
    },
    neonForrest: {
      50: '#ebf4f1',
      100: '#c6f0ec',
      200: '#3311ff',
      300: '#4cd2a4',
      400: '#17b773',
      500: '#0f9f49',
      600: '#0f8c37',
      700: '#0f6d2d',
      800: '#0c4b25',
      900: '#092e1e',
    },
    neonBlue: {
      50: '#f4f8fa',
      100: '#dcf0fb',
      200: '#b5def7',
      300: '#85beeb',
      400: '#33a3ff',
      500: '#4077cd',
      600: '#355cb9',
      700: '#2b4596',
      800: '#1f2f6d',
      900: '#121d46',
    },
    darkPalette: {
      1:'#1061c4',
      '1blur':'#355986',
      2:'#2f435c',
      '2blur':'#38414c',
      3:'#0573fa',
      '3blur':'#3769a6',
      4:'#4c8bd9',
      '4blur':'#6885a8',
      5:'#1265c9',
      '5blur':'#375d8a',
    }
  },





  components: {
    FormLabel: {
      baseStyle: {
        fontSize: 'xs',
        mb: '0',
        mt: '2',
        height: '16px',
      },
    },
    Button,
    Modal: {
      variants: {
        noCapture: {
          parts: ['dialog, dialogContainer'],
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
    Input,
  },
}

const theme = extendTheme(config)

export default theme
