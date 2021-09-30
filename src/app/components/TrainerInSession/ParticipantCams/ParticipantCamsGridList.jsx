import ParticipantCam from './ParticipantCam'
import { Flex } from '@chakra-ui/react'

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
    <Flex flexWrap="wrap" height="94vh" {...props}>
      {attendeesList.map(attendee => <ParticipantCam picture={attendee.picture} name={attendee.name} flex={flex} maxWidth="100%" />)}
    </Flex>
  )

}
