import React, { useEffect, useRef } from 'react'
import { getTraining } from '../graphql/queries'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Box, HStack, useDisclosure, Button } from '@chakra-ui/react'
import { updateAttendee, updateTraining } from '../graphql/mutations'
import { useState } from 'react'
import {
  onCreateAttendee,
  onCreatePoll,
  onDeleteAttendee,
  onDeletePoll,
  onUpdateAttendee,
  onUpdatePoll,
  onCreateSharedDoc,
  onUpdateSharedDoc,
  onDeleteSharedDoc,
  onCreateChatMessage,
} from '../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { PollModal } from './PollModal'
import { WhiteboardModal } from './WhiteboardModal'
import { useBlueJeans, bjnApi } from '../bluejeans/useBlueJeans'
import { BjnMedia } from './BjnMedia'
import LeftPanel from './TrainerInSession/LeftPanel'
import FloatingRightPanel from './TrainerInSession/FloatingRightPanel'
import SettingsModal from './SettingsModal'
import EndTrainingModal from './EndTrainingModal'
import ShareDocumentsModal from './ShareDocumentsModal'
import { ChatPanel } from './ChatComponents/ChatPanel'
import { useHistory } from 'react-router'
import OurModal from './OurModal'
import { BreakoutForm } from './BreakoutForm'
import { useDisconnectedWarning } from './useDisconnectedWarning'
import { CamInUseModal } from './CamInUseModal'
import { useUnreadMsgCount } from './useUnreadMsgCount'
import { ConfirmationModal } from './ConfirmationModal'

export const TrainerInSession = ({
  match: {
    params: { trainingId },
  },
}) => {
  const [training, setTraining] = useState()
  const [attendees, setAttendees] = useState([])
  const [pollToEdit, setPollToEdit] = useState()
  const [polls, setPolls] = useState([])
  const [sharedDocs, setSharedDocs] = useState([])
  const [whiteboard, setWhiteboard] = useState()
  const [chatMessages, setChatMessages] = useState([])
  const [whiteboardShared, setWhiteboardShared] = useState()
  const [startedPoll, setStartedPoll] = useState()
  const [startTimeUpdated, setStartTimeUpdated] = useState(false)
  const [shareWebcam, setShareWebcam] = useState(false)
  const [ended, setEnded] = useState(false)
  const [joinErrorCode, setJoinErrorCode] = useState()
  const joined = useRef(false)
  const { bjnIsInitialized } = useBlueJeans()
  const {
    data: trainingData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))
  const [updateTheAttendee] = useMutation(gql(updateAttendee))
  const {
    isOpen: isPollModalOpen,
    onOpen: onPollModalOpen,
    onClose: onPollModalClose,
  } = useDisclosure()
  const {
    isOpen: isSharedDocModalOpen,
    onOpen: onSharedDocModalOpen,
    onClose: onSharedDocModalClose,
  } = useDisclosure()
  const {
    isOpen: isWhiteboardModalOpen,
    onOpen: onWhiteboardModalOpen,
    onClose: onWhiteboardModalClose,
  } = useDisclosure()
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)
  const [confirmSendLogs, setConfirmSendLogs] = useState(false)
  const [showEndTrainingModal, setShowEndTrainingModal] = useState(false)
  const [chatIsOpen, setChatIsOpen] = useState(true)
  const [hoverFloatingRightPanel, setHoverFloatingRightPanel] = useState(false)
  const [showFloatingRightPanel, setShowFloatingRightPanel] = useState(false)
  const [showBreakoutModal, setShowBreakoutModal] = useState(false)
  const history = useHistory()
  useDisconnectedWarning(ended)
  const handleEndTrainingModalClick = () => setShowEndModal(true)
  const unreadChatMsgCount = useUnreadMsgCount(chatMessages, chatIsOpen)

  /* Mouse Movement Listener */
  const displayTime = 1000 //ms
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) //sleep
  const [listener, setListener] = useState()
  const [rightPanelAnimationEnd, setRightPanelAnimationEnd] = useState(true)

  const handleMouseMove = async () => {
    setShowFloatingRightPanel(true)
    clearTimeout(listener)
    if (!hoverFloatingRightPanel) {
      if (rightPanelAnimationEnd) {
        const timeout = setTimeout(async () => {
          setRightPanelAnimationEnd(false)

          setShowFloatingRightPanel(false)
          const animEndTime = 500 //ms
          await sleep(animEndTime)

          setRightPanelAnimationEnd(true)
        }, displayTime)

        setListener(timeout)
      }
    }
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
        subscribeToMore(buildSubscription(gql(onCreateSharedDoc), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeleteSharedDoc), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdateSharedDoc), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onCreateChatMessage), gql(getTraining))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

  useEffect(() => {
    if (trainingData?.getTraining && (!training || trainingId === trainingData?.getTraining?.id)) {
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
      setSharedDocs(tr.sharedDocs.items)
      setWhiteboard(tr.whiteboardUrl)
      setWhiteboardShared(tr.whiteboardShared)
      setChatMessages(tr.chatMessages.items)
    }
  }, [trainingData, trainingId, training])

  useEffect(() => {
    if (training && !startTimeUpdated) {
      setStartTimeUpdated(true)
      updateCurrentTraining({
        variables: {
          input: {
            id: training.id,
            startedAt: new Date().toISOString(),
            endedAt: null,
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
          // await bjnApi.requestAllPermissions()
          await bjnApi.join(training.meetingId, training.moderatorPasscode, training.trainerName)
        } catch (e) {
          console.error('rla-log: error joining', e)
          setJoinErrorCode(e.code)
        }
      }
    }
    joinMeeting()
  }, [training, bjnIsInitialized])

  const handleEndTrainingClick = () => {
    setShowEndModal(false)
    setEnded(true)
    bjnApi.endMeeting()
    updateCurrentTraining({
      variables: {
        input: {
          id: trainingId,
          endedAt: new Date().toISOString(),
        },
      },
    })
    setShowEndTrainingModal(true)
  }

  if (error || updateError) {
    console.error('rla-log: error', error)
    return <p>An error occured</p>
  }

  if (loading || !training) {
    return <p>Please wait...</p>
  }

  return (
    <Box
      flex="1"
      width="100%"
      height="100%"
      overflowY={'hidden'}
      bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"
      onMouseMove={handleMouseMove}
    >
      <HStack align="left" height="100%">
        <LeftPanel
          training={training}
          attendees={attendees}
          polls={polls}
          startedPoll={startedPoll}
          updateCurrentTraining={updateCurrentTraining}
          updateAttendee={updateTheAttendee}
          setPollToEdit={setPollToEdit}
          onPollModalOpen={onPollModalOpen}
          onManageBreakouts={() => setShowBreakoutModal(true)}
        />
        <BjnMedia shareWebcam={shareWebcam} myAttendeeId={null} />
        {chatIsOpen && <ChatPanel attendees={attendees} training={training} myAttendeeId={'0'} />}
      </HStack>

      <FloatingRightPanel
        role="instructor"
        audioHardMuted={false}
        videoHardMuted={false}
        setVideoMute={(show) => setShareWebcam(!show)}
        hoverOnPanel={setHoverFloatingRightPanel}
        panelIsVisible={showFloatingRightPanel}
        chatIsVisible={chatIsOpen}
        handleSettingsModalVisibility={() => setShowSettingsModal(true)}
        handleShareDocumentsModalVisibility={onSharedDocModalOpen}
        showWhiteboard={onWhiteboardModalOpen}
        handleChatVisibility={() => setChatIsOpen((prev) => !prev)}
        handleEndTrainingModalClick={handleEndTrainingModalClick}
        unreadChatMsgCount={unreadChatMsgCount}
      />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      {/* <OurModal header="Manage breakout" isOpen={showBreakoutModal}>
        <BreakoutForm training={training} onClose={() => setShowBreakoutModal(false)} />
      </OurModal> */}
      <EndTrainingModal isOpen={showEndTrainingModal} onClose={() => history.push('/')} />
      <ShareDocumentsModal
        docs={sharedDocs}
        trainingId={trainingId}
        isOpen={isSharedDocModalOpen}
        onClose={onSharedDocModalClose}
        saveTraining={updateCurrentTraining}
      />
      <PollModal
        trainingId={trainingId}
        isOpen={isPollModalOpen}
        onClose={onPollModalClose}
        poll={pollToEdit}
      />
      <WhiteboardModal
        trainingId={trainingId}
        isOpen={isWhiteboardModalOpen}
        onClose={onWhiteboardModalClose}
        whiteboard={whiteboard}
        shared={whiteboardShared}
      />
      <OurModal header="End training for all?" isOpen={showEndModal}>
        <HStack justifyContent="space-around">
          <Button onClick={handleEndTrainingClick}>End</Button>
          <Button onClick={() => setShowEndModal(false)}>Cancel</Button>
        </HStack>
      </OurModal>
      <ConfirmationModal
        headerMsg="Upload debug logs?"
        okLabel="Upload"
        msg="If you had a technical problem, please press 'Send' and notify us of your problem."
        isOpen={confirmSendLogs}
        onCancel={() => setConfirmSendLogs(false)}
        onOk={() => {
          bjnApi.sendLogs()
          setConfirmSendLogs(false)
        }}
      />
      <CamInUseModal code={joinErrorCode} />
      <Button
        onClick={() => setConfirmSendLogs(true)}
        variant="link"
        position="absolute"
        top="10px"
        left="10px"
        size="xs"
        color="darkgrey"
      >
        Upload logs
      </Button>
    </Box>
  )
}
