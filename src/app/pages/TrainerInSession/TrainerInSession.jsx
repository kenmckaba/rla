import React, { useEffect, useMemo, useRef } from 'react'
import { getTraining } from '../../../graphql/queries'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  Box,
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
  Heading,
  Text,
  Spacer,
  IconButton,
  Icon,
  HStack,
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
import MiddlePanel from '../../components/TrainerInSession/MiddlePanel'
import RightPanel from '../../components/TrainerInSession/RightPanel'
import LeftPanel from '../../components/TrainerInSession/LeftPanel'
import FloatingRightPanel from '../../components/TrainerInSession/FloatingRightPanel'
import SettingsModal from '../../components/Modals/SettingsModal'

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

  const [chatIsOpen, setChatIsOpen] = useState(true)
  const [shareScreenLayout, setShareScreenLayout] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const handleChatVisibility = () => setChatIsOpen(!chatIsOpen)
  const handleShareScreenVisibility = () => setShareScreenLayout(!shareScreenLayout)
  const handleSettingsModalVisibility = () => {console.log('debug') ; setShowSettingsModal(!showSettingsModal) }


  const addAPoll = () => {
    setPollToEdit(null)
    onPollModalOpen()
  }

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
    <Box>
      <HStack bg="#292929" h="100vh">
        <LeftPanel
          training={training}
          attendees={attendees}
          polls={polls}
          addAPoll={addAPoll}
          startedPoll={startedPoll}
          updateCurrentTraining={updateCurrentTraining}
          setPollToEdit={setPollToEdit}
          onPollModalOpen={onPollModalOpen} />
        <Flex
          justifyContent="space-evenly"
          flexDirection="row"
          width="100%"
          height="100vh">
          
          <MiddlePanel
            shareScreenLayout={shareScreenLayout}
            handleShareScreenVisibility={handleShareScreenVisibility}
            chatIsVisible={chatIsOpen}
          />
          <RightPanel 
            flex="1"
            chatIsOpen={chatIsOpen}
            handleChatVisibility={handleChatVisibility}
          />
        </Flex>
      </HStack>
      <FloatingRightPanel
        handleChatVisibility={handleChatVisibility}
        handleShareScreenVisibility={handleShareScreenVisibility}
        handleSettingsModalVisibility={handleSettingsModalVisibility}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onSave={() => setShowSettingsModal(false)}
      />

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

    </Box>
  )
}
