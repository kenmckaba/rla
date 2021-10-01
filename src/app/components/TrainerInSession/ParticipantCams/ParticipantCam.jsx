import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'

export default function ParticipantCam({ picture, name, width, maxWidth, maxHeight, alt,flex, ...props }) {
  return (
  /* <Box position="relative"
      backgroundImage={`url(${picture})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      flex={flex}
      width="100%"
      height="0"
      paddingTop = "17.25%"
      overflow = "hidden"
    >
      <Text fontSize="xs" position="absolute" bottom="0" left="1">{name}</Text>
    </Box>*/

    <Image src={picture} minWidth="385px" width="33%" maxWidth="500px" />
  )
}
