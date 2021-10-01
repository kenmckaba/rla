import ParticipantCam from './ParticipantCam'
import { Badge, Box, Center, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/button'

export default function ParticipantCamsGridList({flex, ...props}) {

  const attendeesList = [
    { picture: '/images/cams/trainer.png', name: 'Trainer (me)' },
    { picture: '/images/cams/attendee-1.png', name: 'Yasir Sierra' },
    { picture: '/images/cams/attendee-2.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-3.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-4.png', name: 'Lisa Iu' },
    { picture: '/images/cams/attendee-5.png', name: 'Kimmy Johnson' },
    { picture: '/images/cams/attendee-6.png', name: 'Robert Lee' },
    { picture: '/images/cams/attendee-1.png', name: 'Omar Rogers' },
    { picture: '/images/cams/attendee-2.png', name: 'Yasir Sierra' },
    { picture: '/images/cams/attendee-3.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-4.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-5.png', name: 'Lisa Iu' },
  ]

  return (
    <Box position="relative">
      <Flex flexWrap="wrap" height="94vh" {...props}>
        {attendeesList.map(attendee => <ParticipantCam picture={attendee.picture} name={attendee.name} flex={flex} maxWidth="100%" />)}
      </Flex>
      <Badge
        position="absolute"
        right="0"
        bottom="2"
        width="100px"
        height="48px"
        color="white"
        background="rgba(0,0,0,0.5)"
        borderRadius="full"
      >
        <Center height="48px">
          <HStack>
            <IconButton
              aria-label="Previous page of cams"
              variant="unstyled"
              icon={<ChevronLeftIcon />}
            />
            <Text>1/2</Text>
            <IconButton
              aria-label="Next page of cams"
              variant="unstyled"
              icon={<ChevronRightIcon />}
            />
          </HStack>
        </Center>
      </Badge>
    </Box>
  )

}
