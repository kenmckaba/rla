import { Box } from '@chakra-ui/layout'

export const ArrowRight = ({ size = 16, color = 'white' }) => {
  const borderTop = `${size / 1.5}px solid transparent`
  const borderBottom = `${size / 1.5}px solid transparent`
  const borderLeft = `${size}px solid ${color}`

  const marginLeft = Math.round((size / 10) * 2) / 2

  return (<Box
    width="0"
    height="0"
    borderTop={borderTop}
    borderBottom={borderBottom}
    borderLeft={borderLeft}
    ml={marginLeft}
  />)
}
