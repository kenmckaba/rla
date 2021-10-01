import ParticipantCam from './ParticipantCam'
import { Badge, Box, Center, SimpleGrid, HStack, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/button'
export default function ParticipantCamsGridList({ dimensions, isStudentView, chatIsVisible, flex, onNextCamClick, onPrevCamClick, ...props }) {

  const attendeesList = [
    { picture: '/images/cams/trainer.png', name: 'Trainer (me)' },
    { picture: '/images/cams/attendee-1.png', name: 'Yasir Sierra' },
    { picture: '/images/cams/attendee-2.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-3.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-4.png', name: 'Lisa Iu' },
    { picture: '/images/cams/attendee-5.png', name: 'Kimmert Lee' },
    { picture: '/images/cams/attendee-1.png', name: 'Omay Johnson' },
    { picture: '/images/cams/attendee-6.png', name: 'Robr Rogers' },
    { picture: '/images/cams/attendee-2.png', name: 'Yasir Sierra' },
    { picture: '/images/cams/attendee-2.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-3.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-4.png', name: 'Lisa Iu' },
    { picture: '/images/cams/attendee-5.png', name: 'Kimmert Lee' },
    { picture: '/images/cams/attendee-1.png', name: 'Omay Johnson' },
    { picture: '/images/cams/attendee-6.png', name: 'Robr Rogers' },
    { picture: '/images/cams/attendee-2.png', name: 'Yasir Sierra' },
  ]

  const getAttendeesDisplayList = () => {
    if (isStudentView) {
      if (chatIsVisible) {
        return attendeesList.splice(0, 9)
      } else {
        return dimensions.width >= 1890 ? attendeesList.splice(0, 16) : attendeesList.splice(0, 12)
      }
    } else {
      if (chatIsVisible) {
        return dimensions.width >= 1890 ? attendeesList.splice(0, 9) : attendeesList.splice(0, 6)
      } else {
        return dimensions.width >= 1890 ? attendeesList.splice(0, 9) : attendeesList.splice(0, 6)
      }
    }
  }

  const getAttendeesDisplayWidth = () => {
    if (isStudentView) {
      if (!chatIsVisible && dimensions.width >= 1890) {
        return '1540px'
      } else {
        return '1155px'
      }
    } else {
      return !chatIsVisible && dimensions.width < 1890 ? '800px' : '1155px'
    }
  }

  const getAttendeesLayout = () => {
    if (isStudentView) {
      if (!chatIsVisible) {
        if (dimensions.width >= 1890) {
          return 4
        } else {
          return 3
        }
      } else {
        return 3
      }
    } else if (!chatIsVisible) {
      if (dimensions.width >= 1890) {
        return 3
      } else {
        return 2
      }
    } else {
      return 2
    }
  }

  return (
    <Box position="relative">
      <SimpleGrid columns={getAttendeesLayout()} spacing={0} {...props} width={getAttendeesDisplayWidth()} overflowY="hidden">
        {getAttendeesDisplayList().map(attendee => <ParticipantCam picture={attendee.picture} name={attendee.name} flex={flex} maxWidth="100%" />)}
      </SimpleGrid>
      <Badge
        position="absolute"
        right="20"
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
              onClick={() => onPrevCamClick && onPrevCamClick()}
            />
            <Text>1/2</Text>
            <IconButton
              aria-label="Next page of cams"
              variant="unstyled"
              icon={<ChevronRightIcon />}
              onClick={() => onNextCamClick && onNextCamClick()}
            />
          </HStack>
        </Center>
      </Badge>
    </Box>
  )

}
