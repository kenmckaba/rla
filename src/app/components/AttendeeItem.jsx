import { gql, useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Box, Center, Flex, HStack, Tr, Td, Tooltip } from '@chakra-ui/react'
import { getAttendee } from '../../graphql/queries'
import { buildSubscription } from 'aws-appsync'
import { onUpdateAttendee } from '../../graphql/subscriptions'
import { updateAttendee } from '../../graphql/mutations'
import { ReactComponent as HandIcon } from '../../assets/icons/hand-icon.svg'
import { ReactComponent as EyeIcon } from '../../assets/icons/eye-icon.svg'
import { ReactComponent as CheckMark } from '../../assets/icons/check-mark.svg'
import { ReactComponent as XMark } from '../../assets/icons/x-mark.svg'

export const AttendeeItem = ({ attendeeId }) => {
  const [attendee, setAttendee] = useState()
  const { data, error, loading, subscribeToMore } = useQuery(gql(getAttendee), {
    variables: { id: attendeeId },
  })
  const [updateCurrentAttendee] = useMutation(gql(updateAttendee))

  useEffect(() => {
    if (subscribeToMore) {
      return subscribeToMore(buildSubscription(gql(onUpdateAttendee), gql(getAttendee)))
    }
  }, [subscribeToMore])

  useEffect(() => {
    if (data && (!attendee || attendeeId === data?.getAttendee?.id)) {
      setAttendee(data.getAttendee)
    }
  }, [data, attendee, attendeeId])

  if (error) {
    console.log('rla-log: error', error)
    return <p>Error!</p>
  }

  if (loading || !attendee) {
    return (
      <Tr>
        <Td>Please wait...</Td>
      </Tr>
    )
  }

  const lowerHand = async () => {
    if (data.getAttendee.handRaised) {
      await updateCurrentAttendee({
        variables: {
          input: {
            id: data.getAttendee.id,
            handRaised: false,
          },
        },
      })
    }
  }

  const attendeePresent = () => {
    return attendee.joinedTime && !attendee.leftTime
  }

  return (
    <Tr id={attendee.id} key={attendee.id}>
      <Td paddingLeft="0">{attendee.name}</Td>
      <Td paddingRight="0">
        <Center>
          {attendeePresent() ? <CheckMark /> : <XMark /> }
        </Center>
      </Td>
      <Td>
        <Center>
          <HStack>
            <EyeIcon />
            <HandIcon />
          </HStack>
        </Center>
      </Td>
    </Tr>
  )
}
