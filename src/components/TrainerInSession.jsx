import React, { useEffect, useMemo, useRef } from 'react'
import { getTraining } from '../graphql/queries'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  Box,
  HStack,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { updateTraining } from '../graphql/mutations'
import { useState } from 'react'
import {
  onCreateAttendee,
  onCreatePoll,
  onDeleteAttendee,
  onDeletePoll,
  onUpdateAttendee,
  onUpdatePoll,
} from '../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { TrainerPoll } from './TrainerPoll'
import { PollModal } from './PollModal'
import { useBlueJeans } from '../bluejeans/useBlueJeans'
import { ClassRoster } from './ClassRoster'
import { AddIcon } from '@chakra-ui/icons'
import { MicCamControls } from './MicCamControls'
import { BjnMedia } from './BjnMedia'
import { CamInUseModal } from './CamInUseModal'

export const TrainerInSession = ({
  match: {
    params: { trainingId },
  },
}) => {
  const [training, setTraining] = useState()
  const [attendees, setAttendees] = useState([])
  const [pollToEdit, setPollToEdit] = useState()
  const [polls, setPolls] = useState([])
  const [startedPoll, setStartedPoll] = useState()
  const [startTimeUpdated, setStartTimeUpdated] = useState(false)
  const joined = useRef(false)
  const localVideoRef = useRef(null)
  const gotVideosRef = useRef(false)
  const { bjnApi, bjnIsInitialized, bjnCamInUseError } = useBlueJeans()
  const {
    data: trainingData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))
  const { isOpen: isEndModalOpen, onOpen: onEndModalOpen } = useDisclosure()
  const {
    isOpen: isPollModalOpen,
    onOpen: onPollModalOpen,
    onClose: onPollModalClose,
  } = useDisclosure()

  const addAPoll = () => {
    setPollToEdit(null)
    onPollModalOpen()
  }

  const Polls = useMemo(() => {
    const startPoll = (poll) => {
      updateCurrentTraining({
        variables: {
          input: {
            id: training.id,
            currentPollId: poll ? poll.id : '',
            pollMode: poll?.stoppedAt ? 'SHOWRESULTS' : 'POLL',
          },
        },
      })
    }

    const editPoll = (p) => {
      setPollToEdit(p)
      onPollModalOpen()
    }

    if (polls.length === 0) {
      return <Box>*None*</Box>
    }
    return polls.map((poll) => {
      return (
        <TrainerPoll
          key={poll.id}
          pollId={poll.id}
          startPoll={startPoll}
          startedPoll={startedPoll}
          editPoll={() => editPoll(poll)}
        />
      )
    })
  }, [polls, startedPoll, updateCurrentTraining, training?.id, onPollModalOpen])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdateAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeleteAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdatePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onCreatePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeletePoll), gql(getTraining))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func())
      }
    }
  }, [subscribeToMore])

  useEffect(() => {
    if (trainingData && (!training || trainingId === trainingData?.getTraining?.id)) {
      const tr = trainingData.getTraining
      setTraining(tr)
      setAttendees(tr.attendees.items)

      const polls = tr.polls.items
      setPolls(polls)
      if (tr.currentPollId) {
        const started = polls.find((poll) => poll.id === tr.currentPollId)
        setStartedPoll(started)
      } else {
        setStartedPoll(null)
      }
    }
  }, [trainingData, trainingId, training])

  useEffect(() => {
    if (training && !startTimeUpdated) {
      setStartTimeUpdated(true)
      updateCurrentTraining({
        variables: {
          input: {
            id: training.id,
            startedAt: Date.now(),
          },
        },
      })
    }
  }, [training, updateCurrentTraining, startTimeUpdated])

  useEffect(() => {
    const joinMeeting = async () => {
      if (training && bjnIsInitialized && !joined.current) {
        joined.current = true
        try {
          await bjnApi.join(training.meetingId, training.moderatorPasscode, training.trainerName)
        } catch (e) {
          console.error('rla-log: error joining', e)
        }
      }
    }
    joinMeeting()
  }, [training, bjnApi, bjnIsInitialized])

  useEffect(() => {
    if (localVideoRef.current && !gotVideosRef.current) {
      bjnApi.attachLocalVideo(localVideoRef.current)
      gotVideosRef.current = true
    }
  })

  const endTraining = () => {
    bjnApi.leave(true)
    onEndModalOpen()
    updateCurrentTraining({
      variables: {
        input: {
          id: trainingId,
          endedAt: Date.now(),
        },
      },
    })
  }

  if (error || updateError) {
    return <p>An error occured</p>
  }

  if (loading || !training) {
    return <p>Please wait...</p>
  }

  return (
    <>
      <HStack align="left">
        <VStack align="left" width="250px" minWidth="250px">
          <Box background="white" borderRadius="16px" padding="8px">
            <Box fontWeight="bold">Training: {training.title}</Box>
            <Box>Description: {training.description}</Box>
          </Box>
          <Box align="start" background="white" borderRadius="16px" padding="8px" fontWeight="600">
            <ClassRoster attendees={attendees} />
          </Box>
          <Box align="start" background="white" borderRadius="16px" padding="8px" fontWeight="600">
            <Accordion allowMultiple width="100%" allowToggle>
              <AccordionItem border="none">
                <AccordionButton padding="0px">
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Polls
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel padding="0" pb={4}>
                  <Box>
                    {Polls}
                    <Button
                      size="xs"
                      variant="outline"
                      float="right"
                      mt="3px"
                      onClick={addAPoll}
                      rightIcon={<AddIcon />}
                    >
                      Add a poll
                    </Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <MicCamControls localVideoRef={localVideoRef} isModerator={true} />
          <Button onClick={endTraining} width="100%">
            End Training
          </Button>
        </VStack>
        <BjnMedia />
      </HStack>
      <Modal isOpen={isEndModalOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent height="300px">
          <ModalHeader>
            <Flex justifyContent="center">The training is over</Flex>
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent="center">Thanks for attending!</Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <PollModal
        trainingId={trainingId}
        isOpen={isPollModalOpen}
        onClose={onPollModalClose}
        poll={pollToEdit}
      />
      <CamInUseModal code={bjnCamInUseError} />
    </>
  )
}
