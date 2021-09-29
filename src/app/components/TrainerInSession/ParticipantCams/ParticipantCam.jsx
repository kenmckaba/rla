import { Box, Text } from '@chakra-ui/layout'

export default function ParticipantCam({ picture, name, width, maxWidth, maxHeight, alt, ...props }) {
  return (
    <Box position="relative"
      backgroundImage={`url(${picture})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      flex="1 1 33.3333%"
      width="100%"
    >
      <Text fontSize="xs" position="absolute" bottom="0" left="1">{name}</Text>
    </Box>
  )
}
