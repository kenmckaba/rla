const Button = {
  baseStyle: {
    textTransform: 'uppercase',
    color: '#ffffff',
    height: '32px',
    fontSize: '10pt',
    fontWeight: 'bold',
    paddingInline: '26px',
    minW: '120px',
    borderRadius: 'full',
    _focus: {
      boxShadow: 'none',
    },
  },
  variants: {
    'primary-transparent': {
      bg: 'rgba(255, 255, 255, 0.1)',
      _hover: {
        bg: 'rgba(255, 255, 255, 0.2)',
      },
      _active: {
        bg: 'rgba(255, 255, 255, 0.3)',
      },
      _focus: {
        bg: 'rgba(255, 255, 255, 0.3)',
      },
    },
    'primary-trueblue': {
      bg: 'blue.600',
      _hover: {
        bg: 'blue.500',
      },
      _active: {
        bg: 'blue.700',
      },
      _focus: {
        bg: 'blue.700',
      },
    },
    'primary-ghost': {
      bg: 'ghost.50',
      color: 'darkKnight.700',
      _hover: {
        bg: 'ghost.100',
      },
      _active: {
        bg: 'ghost.200',
      },
      _focus: {
        bg: 'ghost.200',
      },
    },
    'primary-rose': {
      bg: 'rose.600',
      _hover: {
        bg: 'rose.700',
      },
      _active: {
        bg: 'rose.800',
      },
      _focus: {
        bg: 'rose.800',
      },
    },
    'secondary-martingrey': {
      bg: 'martinGrey.200',
      color: 'darkKnight.700',
      _hover: {
        bg: 'martinGrey.100',
      },
      _active: {
        bg: 'martinGrey.300',
      },
      _focus: {
        bg: 'martinGrey.300',
      },
    },
    'secondary-blue-outline': {
      bg: 'transparent',
      color: 'blue.600',
      border: '2px',
      borderColor: 'blue.600',
      _hover: {
        bg: 'blue.600',
        color: '#ffffff',
      },
      _active: {
        bg: 'blue.700',
        color: '#ffffff',
        borderColor: 'blue.700',
      },
      _focus: {
        bg: 'blue.700',
        color: '#ffffff',
        borderColor: 'blue.700',
      },
    },
    'secondary-ghost-outline': {
      bg: 'transparent',
      color: 'ghost.100',
      border: '2px',
      borderColor: 'ghost.100',
      _hover: {
        bg: 'ghost.100',
        color: 'darkKnight.700',
      },
      _active: {
        bg: 'ghost.100',
        color: 'darkKnight.700',
        borderColor: 'ghost.100',
      },
      _focus: {
        bg: 'ghost.100',
        color: 'darkKnight.700',
        borderColor: 'ghost.100',
      },
    },
    'tertiary-ghost': {
      textTransform: 'capitalization',
      bg: 'ghost.50',
      color: 'darkKnight.700',
      _hover: {
        bg: 'ghost.100',
      },
      _active: {
        bg: 'ghost.200',
      },
      _focus: {
        bg: 'ghost.200',
      },
    },
    'tertiary-foxgrey': {
      textTransform: 'capitalization',
      bg: 'fogGrey.100',
      color: 'darkKnight.700',
      borderRadius: 'none',
      _hover: {
        bg: 'fogGrey.200',
      },
      _active: {
        bg: 'fogGrey.400',
        color: '#ffffff',
      },
      _focus: {
        bg: 'fogGrey.400',
        color: '#ffffff',
      },
    },
    'splashscreen-button': {
      minH: '50px',
      minW: '220px',
      bg: 'ghost.50',
      color: 'blue.500',
      _hover: {
        bg: 'blue.100',
      },
      _active: {
        bg: 'blue.200',
      },
      _focus: {
        bg: 'blue.200',
      },
    },
    'tertiary-outline': {
      textTransform: 'capitalization',
      bg: 'transparent',
      color: 'blue.600',
      border: '2px',
      borderColor: 'blue.600',
      borderRadius: 'none',
      _hover: {
        bg: 'blue.600',
        color: '#ffffff',
      },
      _active: {
        bg: 'blue.700',
        color: '#ffffff',
        borderColor: 'blue.700',
      },
      _focus: {
        bg: 'blue.700',
        color: '#ffffff',
        borderColor: 'blue.700',
      },
    },
    'icon-button': {
      bg: 'transparent',
      color: 'darkKnight.700',
      _hover: {
        bg: 'darkKnight.100',
      },
      _active: {
        bg: 'darkKnight.200',
      },
      _focus: {
        bg: 'darkKnight.200',
      },
    },
  },
  defaultProps: {
    colorScheme: 'blue',
  },
}

export default Button
