import { Box, Text } from '@chakra-ui/layout'

export default function ParticipantCam({ picture, name, width, maxWidth, maxHeight, alt,flex, ...props }) {
  return (
    <Box position="relative"
      backgroundImage={`url(${picture})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      flex={flex}
      width="100%"
    >
      <Text fontSize="xs" position="absolute" bottom="0" left="1">{name}</Text>
    </Box>
  )
}
