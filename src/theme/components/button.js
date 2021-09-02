const Button = {
  baseStyle: {
    textTransform: 'uppercase',
    color: '#ffffff',
    height: '32px',
    fontSize: '14pt',
    fontWeight: 'bold',
    borderRadius: 'full',
    _focus: {
      boxShadow: 'none',
    },
  },
  variants: {
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
    'secondary-outline': {
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
  },
  defaultProps: {
    colorScheme: 'blue',
  },
}

export default Button
