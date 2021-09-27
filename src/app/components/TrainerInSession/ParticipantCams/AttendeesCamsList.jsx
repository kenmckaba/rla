import ParticipantCam from './ParticipantCam'
import { Grid } from '@chakra-ui/react'

export default function AttendeesCamsList() {

  const attendeesList = [
    { picture: '/images/cams/attendee-1.png', name: 'Omar Rogers' },
    { picture: '/images/cams/attendee-2.png', name: 'Yasir Sierra' },
    { picture: '/images/cams/attendee-3.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-4.png', name: 'Amani Kim' },
    { picture: '/images/cams/attendee-5.png', name: 'Lisa Iu' },
    { picture: '/images/cams/attendee-6.png', name: 'Kimmy Johnson' },
    { picture: '/images/cams/attendee-7.png', name: 'Robert Lee' },
    { picture: '/images/cams/attendee-8.png', name: 'Tom Smith' },
  ]

  return (
    <Grid templateColumns="repeat(2, 1fr)">
      {attendeesList.map(attendee => <ParticipantCam picture={attendee.picture} name={attendee.name} maxWidth="100%" />)}
    </Grid>
  )

}
