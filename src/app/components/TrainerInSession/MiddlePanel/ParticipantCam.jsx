import { Image } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/layout'

export default function ParticipantCam({ picture, name, maxWidth, alt }) {
  return (
    <Box position="relative">
      <Image maxW={maxWidth} src={picture} alt={alt ? alt : `${name}'s' webcam`} />
      <Text fontSize="xs" position="absolute" bottom="0" left="1">{name}</Text>
    </Box>
  )
}
