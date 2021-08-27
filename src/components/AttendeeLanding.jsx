import React, { useEffect, useRef, useState } from 'react'
import { getAttendee, getTraining } from '../graphql/queries'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  VStack,
  HStack,
  Box,
  Button,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { createPollResponse, updateAttendee } from '../graphql/mutations'
import BJNEmbedSDK from 'bluejeans-webrtc-embed-sdk'
import { buildSubscription } from 'aws-appsync'
import { onUpdateAttendee, onUpdateTraining } from '../graphql/subscriptions'
import { PollChoices } from './PollChoices'
import { prettyTime } from '../pretty-time'

const bluejeans = function (meetingId, passcode, name, id) {
  BJNEmbedSDK.joinMeeting({
    meetingInfo: {
      meetingId: meetingId,
      passcode: passcode,
      name: name,
    },
    iFrameProps: {
      selectorId: id,
    },
    uiProps: {},
  })
}

export const AttendeeLanding = ({
  match: {
    params: { attendeeId },
  },
}) => {
  const {
    data: attendeeData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getAttendee), {
    variables: { id: attendeeId },
  })
  const [getCurrentTraining, { data: trainingData }] = useLazyQuery(gql(getTraining))
  const [attendee, setAttendee] = useState()
  const updatingJoinedTime = useRef(false)
  const updatedJoinedTime = useRef(false)
  const joined = useRef(false)
  const [left, setLeft] = useState(false)
  const { isOpen: isModalOpen, onOpen: onModalOpen } = useDisclosure()
  const [currentPoll, setCurrentPoll] = useState()
  const [pollMode, setPollMode] = useState('NONE')
  const [handRaised, setHandRaised] = useState(false)
  const [training, setTraining] = useState()
  const [participantName, setParticipantName] = useState()
  const [updateCurrentAttendee] = useMutation(gql(updateAttendee))
  const [createCurrentPollResponse] = useMutation(gql(createPollResponse))

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onUpdateAttendee), gql(getAttendee))),
        subscribeToMore(buildSubscription(gql(onUpdateTraining), gql(getAttendee))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func())
      }
    }
  }, [subscribeToMore])

  useEffect(() => {
    if (updatingJoinedTime.current) {
      updatingJoinedTime.current = false
    } else if (attendeeData && (!attendee || attendeeId === attendeeData?.getAttendee?.id)) {
      const att = attendeeData.getAttendee
      setAttendee(att)
      setParticipantName(att.name)
      setHandRaised(att.handRaised)
      const tr = att.training
      // have to retrieve training since polls aren't returned from attendee.training because query depth = 2
      getCurrentTraining({ variables: { id: tr.id } })
    }
  }, [attendeeData, attendeeId, attendee, getCurrentTraining])

  useEffect(() => {
    if (trainingData) {
      const tr = trainingData.getTraining
      setTraining(tr)
      if (tr.currentPollId) {
        const p = tr.polls.items.find((poll) => poll.id === tr.currentPollId)
        setCurrentPoll(p)
        setPollMode(tr.pollMode)
      } else {
        setCurrentPoll(null)
        setPollMode('NONE')
      }
    }
  }, [trainingData])

  useEffect(() => {
    if (attendee && !updatedJoinedTime.current) {
      // updatingJoinedTime.current = true
      updatedJoinedTime.current = true
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            joinedTime: Date.now(),
            leftTime: null, // erase in case they previously joined
          },
        },
      })
    }
  }, [attendee, updateCurrentAttendee])

  useEffect(() => {
    if (training && !joined.current) {
      joined.current = true
      bluejeans(training.meetingId, training.participantPasscode, participantName, '#bluejeansdiv')
    }
  }, [training, participantName])

  useEffect(() => {
    BJNEmbedSDK.observe('connectionState', () => {
      if (BJNEmbedSDK.connectionState === 'Disconnected') {
        onModalOpen()
        updateCurrentAttendee({
          variables: {
            input: {
              id: attendeeId,
              leftTime: Date.now(),
            },
          },
        })
      }
    })
  }, [attendeeId, updateCurrentAttendee, onModalOpen])

  if (error) {
    return <p>An error occured</p>
  }

  if (loading || !training) {
    return <p>Please wait...</p>
  }

  const toggleHand = () => {
    const newValue = !handRaised
    setHandRaised(newValue)
    updateCurrentAttendee({
      variables: {
        input: {
          id: attendee.id,
          handRaised: newValue,
        },
      },
    })
  }

  const onChangeParticipantName = (e) => {
    setParticipantName(e.target.value)
  }

  const updateName = () => {
    BJNEmbedSDK.setName(participantName)
  }

  const leaveTraining = () => {
    BJNEmbedSDK.leave()
    updateCurrentAttendee({
      variables: {
        input: {
          id: attendee.id,
          leftTime: Date.now(),
        },
      },
    })
    setLeft(true)
  }

  const onSubmitPoll = async (response) => {
    await createCurrentPollResponse({
      variables: {
        input: {
          pollId: currentPoll.id,
          attendeeId: attendee.id,
          response: response,
        },
      },
    })
  }

  return (
    <>
      <HStack height="100%" alignItems="flex-start">
        <VStack>
          <VStack alignItems="flex-start" background="white" borderRadius="20px" padding="8px">
            <Box fontWeight="bold">Welcome to the training!</Box>
            <Box>Title: {training.title}</Box>
            {training.description && <Box>{training.description}</Box>}
            <Box>Start time: {prettyTime(new Date(Number(training.scheduledTime)))}</Box>
            <HStack alignContent="center">
              <Box width="80px">Join as:</Box>
              <Input type="text" value={participantName} onChange={onChangeParticipantName} />
              <Button size="xs" variant="outline" onClick={updateName}>
                Update
              </Button>
            </HStack>
            <Button size="sm" onClick={toggleHand} variant="outline">
              {handRaised ? 'Lower hand 🙋' : 'Raise hand 🙋'}
            </Button>
          </VStack>

          {currentPoll && (
            <VStack
              alignItems="flex-start"
              width="100%"
              background="white"
              borderRadius="20px"
              padding="8px"
            >
              <Box fontWeight="bold">{pollMode === 'POLL' ? 'Poll' : 'Poll results'}</Box>
              <Box>
                {
                  <PollChoices
                    pollId={currentPoll.id}
                    pollMode={pollMode}
                    onSubmit={onSubmitPoll}
                  />
                }
              </Box>
            </VStack>
          )}
          <Button size="sm" onClick={leaveTraining}>
            Leave training
          </Button>
        </VStack>

        <Flex
          borderRadius="6px"
          background="lightblue"
          id="bluejeansdiv"
          height="83vh"
          width="83vw"
          display="block"
          alignItems="center"
          margin-right="auto"
          justifyContent="center"
        ></Flex>
      </HStack>
      <Modal isOpen={isModalOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent height="300px">
          <ModalHeader>
            <Flex justifyContent="center">
              {left ? 'You have left the training.' : 'The training is over.'}
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent="center">Thanks for attending!</Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
