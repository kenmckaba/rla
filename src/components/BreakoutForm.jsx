import { useMutation, useQuery, gql } from '@apollo/client'
import { Button, Box, HStack, VStack } from '@chakra-ui/react'
import { buildSubscription } from 'aws-appsync'
import { useEffect, useState } from 'react'
import { createMeeting } from '../bluejeans/fetch-api'
import {
  createBreakoutRoom,
  updateAttendee,
  createTraining,
  updateTraining,
  createAttendee,
} from '../graphql/mutations'
import { listBreakoutRooms } from '../graphql/queries'
import {
  onCreateBreakoutRoom,
  onDeleteBreakoutRoom,
  onUpdateBreakoutRoom,
} from '../graphql/subscriptions'

export const BreakoutForm = ({ onClose, training }) => {
  const [breakoutRooms, setBreakoutRooms] = useState([])
  const [addNewBreakoutRoom] = useMutation(gql(createBreakoutRoom))
  const [addNewAttendee] = useMutation(gql(createAttendee))
  const [updateTheAttendee] = useMutation(gql(updateAttendee))
  const [addTraining] = useMutation(gql(createTraining))
  const {
    data: breakoutListData,
    loading,
    subscribeToMore,
  } = useQuery(gql(listBreakoutRooms), {
    variables: { filter: { trainingId: { eq: training.id } } },
  })
  const [updateCurrentTraining] = useMutation(gql(updateTraining))

  useEffect(() => {
    if (breakoutListData) {
      setBreakoutRooms(breakoutListData.listBreakoutRooms.items)
    }
  }, [breakoutListData])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onUpdateBreakoutRoom), gql(listBreakoutRooms))),
        subscribeToMore(buildSubscription(gql(onCreateBreakoutRoom), gql(listBreakoutRooms))),
        subscribeToMore(buildSubscription(gql(onDeleteBreakoutRoom), gql(listBreakoutRooms))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

  const createBreakouts = async () => {
    const breakoutCount = 2
    const newBreakouts = [...breakoutRooms]
    for (let index = breakoutRooms.length; index < breakoutCount; index++) {
      const title = `Room ${index}`

      const result = await createMeeting(
        title,
        'a breakout',
        new Date(training.scheduledTime).getTime(),
        1739569900000, // Feb 14 2025 13:51:40 GMT-0800 so it doesn't expire
        'US/Pacific',
      )

      const trainingResponse = await addTraining({
        variables: {
          input: {
            trainerName: training.trainerName,
            type: 'BREAKOUT',
            title,
            scheduledTime: training.scheduledTime,
            meetingId: result.numericMeetingId,
            moderatorPasscode: training.moderatorPasscode,
            participantPasscode: result.attendeePasscode,
          },
        },
      })
      const breakoutTrainingId = trainingResponse.data.createTraining.id
      const response = await addNewBreakoutRoom({
        variables: {
          input: {
            name: title,
            bluejeansMeetingId: result.numericMeetingId,
            bluejeansModeratorPasscode: training.moderatorPasscode,
            bluejeansParticipantPasscode: result.attendeePasscode,
            trainingId: training.id,
            breakoutTrainingId: breakoutTrainingId,
          },
        },
      })
      newBreakouts.push(response.data.createBreakoutRoom)
    }

    const roomCounts = []
    newBreakouts.forEach((br) => roomCounts.push(br.attendees.items.length))

    training.attendees.items.forEach(async (attendee) => {
      if (!attendee.breakoutRoomId) {
        const leastCrowded = roomCounts.indexOf(Math.min(...roomCounts))
        roomCounts[leastCrowded] += 1
        const { breakoutTrainingId, id: breakoutId } = newBreakouts[leastCrowded]

        // new attendee for breakout training
        const addAttendeeResult = await addNewAttendee({
          variables: {
            input: {
              name: attendee.name,
              email: attendee.email,
              trainingId: breakoutTrainingId,
              // mainTrainingId: training.id,
              mainTrainingAttendeeId: attendee.id,
            },
          },
        })

        // attendee from main training
        await updateTheAttendee({
          variables: {
            input: {
              id: attendee.id,
              breakoutRoomId: breakoutId,
              breakoutRoomAttendeeId: addAttendeeResult.data.createAttendee.id,
            },
          },
        })
      }
    })
    setBreakoutRooms(newBreakouts)
  }

  const onStart = async (startIt) => {
    await updateCurrentTraining({
      variables: {
        input: {
          id: training.id,
          breakoutInProgress: startIt,
        },
      },
    })
  }

  if (loading) {
    return <p>Please wait...</p>
  }

  return (
    <>
      <HStack alignItems="top">
        <Box border="1px solid cornflowerblue" borderRadius="6px" padding="4px">
          <Box textDecoration="underline">Unassigned</Box>
          {training.attendees.items.map(
            (att) => !att.breakoutRoomId && <Box key={att.id}>{att.name}</Box>,
          )}
        </Box>
        {breakoutRooms?.length && (
          <HStack alignItems="top">
            {breakoutRooms.map((room) => {
              return (
                <VStack
                  key={room.id}
                  spacing="0"
                  border="1px solid cornflowerblue"
                  borderRadius="6px"
                  padding="4px"
                >
                  <Box textDecoration="underline" key={room.id}>
                    {room.name}
                  </Box>
                  {room.attendees.items.map((att) => (
                    <Box key={att.id} marginLeft="5px">
                      {att.name}
                    </Box>
                  ))}
                </VStack>
              )
            })}
          </HStack>
        )}
      </HStack>
      <HStack marginTop="25px" justifyContent="space-between">
        <Button onClick={createBreakouts}>Assign attendees</Button>
        {training.breakoutInProgress ? (
          <Button onClick={() => onStart(false)}>Stop</Button>
        ) : (
          <Button onClick={() => onStart(true)}>Start</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </HStack>
    </>
  )
}
