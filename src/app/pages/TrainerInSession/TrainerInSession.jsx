import React, { useEffect, useMemo, useRef } from 'react'
import { getTraining } from '../../../graphql/queries'
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
  Tr,
  Td,
  Thead,
  Th,
  Table,
  Tbody,
  Text,
  Spacer,
  IconButton,
  Icon,
  Center,
} from '@chakra-ui/react'
import { updateTraining } from '../../../graphql/mutations'
import { useState } from 'react'
import {
  onCreateAttendee,
  onCreatePoll,
  onDeleteAttendee,
  onDeletePoll,
  onUpdateAttendee,
  onUpdatePoll,
} from '../../../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { TrainerPoll } from '../../components/TrainerPoll'
import { PollModal } from '../../components/PollModal'
import { useBlueJeans } from '../../../bluejeans/useBlueJeans'
import { ClassRoster } from '../../components/ClassRoster'
import { AddIcon } from '@chakra-ui/icons'
import { MicCamControls } from '../../components/MicCamControls'
import { BjnMedia } from '../../components/BjnMedia'
import { CamInUseModal } from '../../components/CamInUseModal'
import { FaCamera, FaMicrophone, FaVideo } from 'react-icons/fa'
import { prettyTime } from '../../../pretty-time'


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
      /*       return () => {
        cleanupFuncs.forEach((func) => func())
      } */
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
      <VStack
        bg="white"
        w="100%"
        h="100%"
        minH="100vh"
        alignItems="start"
        wrap="wrap"
        alignContent="center"
        justifyContent="center"
      >
        <VStack
          pos="absolute"
          bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
          opacity="85%"
          align="left"
          width="250px"
          h="100%"
          px="4"
          py="8"
          minWidth="400px"
        >
          <Box pb="12">
            <Text fontSize="1.25em" fontWeight="bold" textTransform="capitalize">
              {training.title}
            </Text>

            <Text fontSize=".62em" fontWeight="bold" textTransform="capitalize">
              {prettyTime(new Date(+training.scheduledTime))}
            </Text>

            <Box
              bg="white"
              height="0px"
              width="300px"
              border="1px solid #ffffff"
              opacity="0.25"
            />

            <Text marginTop="1" fontSize=".62em" opacity="0.5">
              {training.description}
            </Text>
          </Box>
          <Box bg="rgba(255, 255, 255, 0.1)" align="start" borderRadius="sm" fontWeight="600">
            <ClassRoster attendees={attendees} />
          </Box>
          <Box bg="rgba(255, 255, 255, 0.1)" align="start" borderRadius="sm" fontWeight="600">
            <Accordion allowMultiple width="100%" allowToggle>
              <AccordionItem p={0} m={0} border="none">
                <AccordionButton p="2">
                  <Box
                    marginLeft="2"
                    flex="1"
                    textAlign="left"
                    fontWeight="semibold"
                    fontSize="0.9em"
                  >
                    Polls
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel overflowY="scroll" maxH="48" padding="0" pb={4}>
                  <Box>
                    <Table size="sm" width="100%" margin="0">
                      <Thead borderBottom="2px" borderColor="rgba(255, 255, 255, 0.2)">
                        <Tr>
                          <Th color="white">Question</Th>
                          <Th color="white">Completed</Th>
                          <Th />
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Polls}
                        <Tr>
                          <Td border="none" colSpan="3">
                            <Button size="xs" variant="unstyled" onClick={addAPoll}>
                              <Text textTransform="capitalize" fontWeight="thin">
                                + Add poll
                              </Text>
                            </Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <MicCamControls localVideoRef={localVideoRef} isModerator={true} />
          <Box w="100%" h="100%">
            <Flex w="100%" h="100%" px="4" alignContent="end" wrap="wrap">
              <IconButton
                boxSize="12"
                bg="rgba(255,255,255,.1)"
                aria-label="Mute or unmute the microphone"
                icon={<Icon as={FaMicrophone} w="100%" h="45%" />}
              />
              <Spacer />
              <IconButton
                boxSize="12"
                bg="rgba(255,255,255,.1)"
                aria-label="Turn on or turn off the camera"
                icon={<Icon as={FaVideo} w="100%" h="45%" />}
              />
              <Spacer />
              <Button w="65%" onClick={endTraining}>
                End Training
              </Button>
            </Flex>
          </Box>
        </VStack>
        <Center>
          <BjnMedia />
        </Center>
      </VStack>
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
