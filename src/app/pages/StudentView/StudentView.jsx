import React, { useEffect, useRef } from 'react'
import { getTraining } from '../../../graphql/queries'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  Box,
  Flex,
  HStack,
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
import { PollModal } from '../../components/PollModal'
import { useBlueJeans } from '../../../bluejeans/useBlueJeans'
import { CamInUseModal } from '../../components/CamInUseModal'
import MiddlePanel from '../../components/TrainerInSession/MiddlePanel'
import RightPanel from '../../components/TrainerInSession/RightPanel'
import FloatingRightPanel from '../../components/TrainerInSession/FloatingRightPanel'
import SettingsModal from '../../components/Modals/SettingsModal'
import { useHistory } from 'react-router'
import ShareDocumentsModal from '../../components/Modals/ShareDocumentsModal'
import LeaveTrainingModal from '../../components/Modals/LeaveTrainingModal'
import AnswerPollModal from '../../components/Modals/AnswerPollModal'
import ExternalDocumentsModal from '../../components/Modals/ExternalDocumentsModal'

export const StudentView = ({
  match: {
    params: { trainingId },
  },
}) => {
  const [training, setTraining] = useState()
  const [attendees, setAttendees] = useState([])
  const [startTimeUpdated, setStartTimeUpdated] = useState(false)
  const joined = useRef(false)
  const localVideoRef = useRef(null)
  const gotVideosRef = useRef(false)
  const history = useHistory()
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

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showLeaveTrainingModal, setShowLeaveTrainingModal] = useState(false)
  const [showExternalDocumentsModal, setShowExternalDocumentsModal] = useState(false)
  const [showAnswerPollModal, setShowAnswerPollModal] = useState(false)

  const [chatIsOpen, setChatIsOpen] = useState(true)
  const [shareScreenLayout, setShareScreenLayout] = useState(false)
  const [webcamIsVisible, setWebcamIsVisible] = useState(true)
  const [micIsVisible, setMicIsVisible] = useState(true)

  const handleChatVisibility = () => setChatIsOpen(!chatIsOpen)
  const handleShareScreenVisibility = () => setShareScreenLayout(!shareScreenLayout)
  const handleSettingsModalVisibility = () => setShowSettingsModal(!showSettingsModal)
  const handleExternalDocumentsModalVisibility = () => setShowExternalDocumentsModal(!showExternalDocumentsModal)
  const handleWebcamVisibility = () => setWebcamIsVisible(!webcamIsVisible)
  const handleMicVisibility = () => setMicIsVisible(!micIsVisible)
  const handleLeaveTrainingModalClick = () => setShowLeaveTrainingModal(true)
  const handleLeaveTrainingClick = () => {
    bjnApi.leave(true)
    updateCurrentTraining({
      variables: {
        input: {
          id: trainingId,
          endedAt: Date.now(),
        },
      },
    })

    setShowLeaveTrainingModal(false)
    history.push('/dashboard')
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

  if (error || updateError) {
    return <p>An error occured</p>
  }

  if (loading || !training) {
    return <p>Please wait...</p>
  }

  return (
    <Box>
      <HStack bg="#292929" h="100vh">
        <Flex
          justifyContent="space-evenly"
          flexDirection="row"
          width="100%"
          height="100vh">

          <MiddlePanel
            shareScreenLayout={shareScreenLayout}
            handleShareScreenVisibility={handleShareScreenVisibility}
            chatIsVisible={chatIsOpen}
            onNextCamClick={() => setShowAnswerPollModal(true)}
            onPrevCamClick={() => setShowAnswerPollModal(true)}
          />
          <RightPanel
            flex="1"
            chatIsOpen={chatIsOpen}
            handleChatVisibility={handleChatVisibility}
            handleShareDocumentsModalVisibility={handleExternalDocumentsModalVisibility}
          />
        </Flex>
      </HStack>
      <FloatingRightPanel
        role="student"
        chatIsVisible={chatIsOpen}
        shareScreenIsVisible={shareScreenLayout}
        webcamIsVisible={webcamIsVisible}
        micIsVisible={micIsVisible}
        handleSettingsModalVisibility={handleSettingsModalVisibility}
        handleShareDocumentsModalVisibility={handleExternalDocumentsModalVisibility}
        handleMicVisibility={handleMicVisibility}
        handleWebcamVisibility={handleWebcamVisibility}
        handleChatVisibility={handleChatVisibility}
        handleShareScreenVisibility={handleShareScreenVisibility}
        handleEndTrainingModalClick={handleLeaveTrainingModalClick}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onSave={() => setShowSettingsModal(false)}
      />

      <LeaveTrainingModal
        isOpen={showLeaveTrainingModal}
        onClose={() => setShowLeaveTrainingModal(false)}
        onEndTraining={() => handleLeaveTrainingClick()}
      />

      <ExternalDocumentsModal
        isOpen={showExternalDocumentsModal}
        onClose={() => setShowExternalDocumentsModal(false)}
      />

      <AnswerPollModal
        isOpen={showAnswerPollModal}
        onClose={() => setShowAnswerPollModal(false)}
        onAnswer={() => setShowAnswerPollModal(false)}
      />

      <CamInUseModal code={bjnCamInUseError} />

    </Box>
  )
}
