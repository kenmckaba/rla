import React, { useEffect, useRef, useState, useCallback } from 'react'
import { getAttendee, getSharedDoc } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Link,
  HStack,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  Center,
  VStack,
  Text,
} from '@chakra-ui/react'
import { createPollResponse, updateAttendee } from '../graphql/mutations'
import { buildSubscription } from 'aws-appsync'
import {
  onCreateChatMessage,
  onUpdateAttendee,
  onUpdateSharedDoc,
  onUpdateTraining,
} from '../graphql/subscriptions'
import { PollChoices } from './PollChoices'
import { useBlueJeans, bjnApi } from '../bluejeans/useBlueJeans'
import { BjnMedia } from './BjnMedia'
import FloatingRightPanel from './TrainerInSession/FloatingRightPanel'
import SettingsModal from './SettingsModal'
import OurModal from './OurModal'
import { SharedDocs } from './SharedDocs'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { SidePanel } from './ChatComponents/SidePanel'
import { useDisconnectedWarning } from './useDisconnectedWarning'
import { CamInUseModal } from './CamInUseModal'
import { useUnreadMsgCount } from './useUnreadMsgCount'
import { ConfirmationModal } from './ConfirmationModal'
import { timestampToPrettyTime } from '../utils/pretty-time'

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
  const { bjnIsInitialized } = useBlueJeans()
  const [attendee, setAttendee] = useState()
  const joined = useRef(false)
  const [joinErrorCode, setJoinErrorCode] = useState()
  const updatingJoinedTime = useRef(false)
  const updatedJoinedTime = useRef(false)
  const [left, setLeft] = useState(false)
  const { isOpen: isEndedModalOpen, onOpen: onEndedModalOpen } = useDisclosure()
  const [currentPoll, setCurrentPoll] = useState()
  const [pollMode, setPollMode] = useState('NONE')
  const [sharedDocs, setSharedDocs] = useState([])
  const [whiteboard, setWhiteboard] = useState()
  const [whiteboardShared, setWhiteboardShared] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [training, setTraining] = useState()
  const [participantName, setParticipantName] = useState()
  const [updateCurrentAttendee] = useMutation(gql(updateAttendee))
  const [createCurrentPollResponse] = useMutation(gql(createPollResponse))
  const [hoverFloatingRightPanel, setHoverFloatingRightPanel] = useState(false)
  const [showFloatingRightPanel, setShowFloatingRightPanel] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [answeredPolls, setAnsweredPolls] = useState([])
  // const [unreadChatMsgCount, setUnreadMsgCount] = useState(0)
  // const chatMsgCount = useRef(0)

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
  const handleChatVisibility = () => setChatIsOpen(!chatIsOpen)

  /* Mouse Movement Listener */
  const displayTime = 1000 //ms
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const [listener, setListener] = useState()
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [confirmSendLogs, setConfirmSendLogs] = useState(false)
  const [rightPanelAnimationEnd, setRightPanelAnimationEnd] = useState(true)
  const [chatIsOpen, setChatIsOpen] = useState(true)
  const [attendees, setAttendees] = useState([])
  const [shareWebcam, setShareWebcam] = useState(false)
  const [hasLeftOrEnded, setHasLeftOrEnded] = useState(false)
  const [trainingAudioStateKey, setTrainingAudioStateKey] = useState(0)
  const [attendeeAudioStateKey, setAttendeeAudioStateKey] = useState(0)
  const [trainingVideoStateKey, setTrainingVideoStateKey] = useState(0)
  const [attendeeVideoStateKey, setAttendeeVideoStateKey] = useState(0)
  const unreadChatMsgCount = useUnreadMsgCount(chatMessages, chatIsOpen)
  const [trainingStarted, setTrainingStarted] = useState(false)
  const [trainingExpired, setTrainingExpired] = useState(false)

  useDisconnectedWarning(hasLeftOrEnded)

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
        subscribeToMore(buildSubscription(gql(onUpdateAttendee), gql(getAttendee))),
        subscribeToMore(buildSubscription(gql(onUpdateTraining), gql(getAttendee))),
        subscribeToMore(buildSubscription(gql(onUpdateSharedDoc), gql(getSharedDoc))),
        subscribeToMore(buildSubscription(gql(onCreateChatMessage), gql(getAttendee))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
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
    }
  }, [attendeeData, attendeeId, attendee])

  useEffect(() => {
    if (attendee && attendee.audioStateKey !== attendeeAudioStateKey) {
      bjnApi.setAudioMuted(true)
      setAttendeeAudioStateKey(attendee.audioStateKey)
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            audioHardMuted: attendee.audioHardMuted,
            audioUnmuted: false,
          },
        },
      })
    }
  }, [attendeeAudioStateKey, attendee, updateCurrentAttendee])

  useEffect(() => {
    if (attendee && attendee.videoStateKey !== attendeeVideoStateKey) {
      bjnApi.setVideoMuted(true)
      setAttendeeVideoStateKey(attendee.videoStateKey)
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            videoHardMuted: attendee.videoHardMuted,
            videoUnmuted: false,
          },
        },
      })
    }
  }, [attendeeVideoStateKey, attendee, updateCurrentAttendee])

  useEffect(() => {
    if (training && training.endedAt) {
      setHasLeftOrEnded(true)
      onEndedModalOpen()
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendeeId,
            leftTime: new Date().toISOString(),
          },
        },
      })
    }
  }, [training, attendeeId, onEndedModalOpen, updateCurrentAttendee])

  const joinTraining = useCallback(async (breakoutTrainingId) => {
    bjnApi.leave(false) // sometimes doesn't ever resolve
    window.location.href = `${window.location.origin}/attendee/${breakoutTrainingId}`
  }, [])

  useEffect(() => {
    if (attendee) {
      const tr = attendee.training
      setTraining(tr)
      if (tr.breakoutInProgress) {
        joinTraining(attendee.breakoutRoomAttendeeId)
        return
      }

      if (tr.type === 'BREAKOUT' && !attendee.breakoutRoom.training.breakoutInProgress) {
        joinTraining(attendee.mainTrainingAttendeeId)
        return
      }

      setTrainingStarted(!!tr.startedAt)

      if (tr.startedAt && !joined.current) {
        const hrs6ms = 6 * 60 * 60 * 1000 // no meeting should last longer
        const now = Date.now()
        const started = new Date(tr.startedAt).getTime()
        const diff = now - started
        console.log('@ken times', {
          now: new Date(now),
          started: new Date(tr.startedAt),
          diff: diff / 1000,
          hrs6: hrs6ms / 1000,
        })
        setTrainingExpired(diff > hrs6ms) // 6 hours
      }
      const d = tr.sharedDocs.items
      setSharedDocs(d)
      setWhiteboard(tr.whiteboardUrl)
      setWhiteboardShared(tr.whiteboardShared)
      setChatMessages(tr.chatMessages.items)
      setAttendees(tr.attendees.items)
      if (tr.currentPollId) {
        if (tr.pollMode === 'SHOWRESULTS' || !answeredPolls.includes(tr.currentPollId)) {
          const p = tr.polls.items.find((poll) => poll.id === tr.currentPollId)
          setCurrentPoll(p)
          setPollMode(tr.pollMode)
        }
      } else {
        setCurrentPoll(null)
        setPollMode('NONE')
      }
    }
  }, [attendee, answeredPolls, joinTraining])

  useEffect(() => {
    if (attendee && training && training.audioStateKey !== trainingAudioStateKey) {
      bjnApi.setAudioMuted(true)
      setTrainingAudioStateKey(training.audioStateKey)
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            audioHardMuted: training.audioHardMuted,
            audioUnmuted: false,
          },
        },
      })
    }
  }, [trainingAudioStateKey, attendee, training, updateCurrentAttendee])

  useEffect(() => {
    if (attendee && training && training.videoStateKey !== trainingVideoStateKey) {
      bjnApi.setVideoMuted(true)
      setTrainingVideoStateKey(training.videoStateKey)
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            videoHardMuted: training.videoHardMuted,
            videoUnmuted: false,
          },
        },
      })
    }
  }, [trainingVideoStateKey, attendee, training, updateCurrentAttendee])

  useEffect(() => {
    if (attendee && !updatedJoinedTime.current) {
      updatedJoinedTime.current = true
      updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            joinedTime: new Date().toISOString(),
            leftTime: null, // erase in case they previously joined
          },
        },
      })
    }
  }, [attendee, updateCurrentAttendee])

  useEffect(() => {
    const joinMeeting = async () => {
      if (trainingStarted && !trainingExpired && bjnIsInitialized && !joined.current) {
        joined.current = true
        try {
          await bjnApi.requestAllPermissions()
          await bjnApi.join(training.meetingId, training.participantPasscode, participantName)
        } catch (error) {
          setJoinErrorCode(error.code)
        }
      }
    }
    joinMeeting()
  }, [trainingStarted, trainingExpired, training, participantName, bjnIsInitialized])

  const Whiteboard = whiteboardShared ? (
    <Box marginLeft="20px">
      <Link href={whiteboard} isExternal cursor="pointer">
        {whiteboard}
        <ExternalLinkIcon marginLeft="5px" marginBottom="3px" />
      </Link>
    </Box>
  ) : (
    <Box marginLeft="20px">*No whiteboard shared*</Box>
  )

  if (error) {
    console.error('rla-log: error', error)
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

  const leaveTraining = () => {
    setShowLeaveModal(false)
    setHasLeftOrEnded(true)
    bjnApi.leave()
    updateCurrentAttendee({
      variables: {
        input: {
          id: attendee.id,
          leftTime: new Date().toISOString(),
        },
      },
    })
    setLeft(true)
    onEndedModalOpen()
  }

  const onSubmitPoll = async (response) => {
    await createCurrentPollResponse({
      variables: {
        input: {
          pollId: currentPoll.id,
          attendeeId: attendee.id,
          response,
        },
      },
    })
    setTimeout(() => {
      setAnsweredPolls((prev) => [...prev, currentPoll.id])
      setCurrentPoll(null)
      setPollMode('NONE')
    }, 3000) // hide upon submit
  }

  const setAudioMute = (muted) => {
    updateCurrentAttendee({
      variables: {
        input: {
          id: attendeeId,
          audioUnmuted: !muted,
        },
      },
    })
  }

  const setVideoMute = (muted) => {
    setShareWebcam(!muted)
    updateCurrentAttendee({
      variables: {
        input: {
          id: attendeeId,
          videoUnmuted: !muted,
        },
      },
    })
  }

  return (
    <Box
      onMouseMove={handleMouseMove}
      width="100%"
      height={'99.99vh'}
      position="relative"
      bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"
    >
      <HStack alignItems="start" height="100%">
        <BjnMedia
          shareWebcam={shareWebcam}
          myAttendeeId={attendeeId}
          marginLeft={true}
          training={training}
          marginRight={!chatIsOpen}
        />
        {chatIsOpen && (
          <SidePanel attendees={attendees} attendeeId={attendeeId} training={training} />
        )}
      </HStack>
      <FloatingRightPanel
        role="student"
        audioHardMuted={attendee.audioHardMuted}
        videoHardMuted={attendee.videoHardMuted}
        setAudioMute={setAudioMute}
        setVideoMute={setVideoMute}
        hoverOnPanel={setHoverFloatingRightPanel}
        panelIsVisible={showFloatingRightPanel}
        chatIsVisible={chatIsOpen}
        handleSettingsModalVisibility={() => setShowSettingsModal(true)}
        handleShareDocumentsModalVisibility={onSharedDocModalOpen}
        showWhiteboard={onWhiteboardModalOpen}
        handleChatVisibility={handleChatVisibility}
        handleEndTrainingModalClick={() => setShowLeaveModal(true)}
        toggleHand={toggleHand}
        handRaised={handRaised}
        sharedDocsCount={sharedDocs.reduce((acc, d) => {
          if (d.shared) {
            acc += 1
          }
          return acc
        }, 0)}
        unreadChatMsgCount={unreadChatMsgCount}
      />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      <Modal variant="noCapture" trapFocus={false} isOpen={!!currentPoll} scrollBehavior="inside">
        <ModalContent color="darkKnight.700">
          <ModalHeader>{pollMode === 'POLL' ? 'Quick poll' : 'Poll results'}</ModalHeader>
          <ModalBody>
            <PollChoices pollId={currentPoll?.id} pollMode={pollMode} onSubmit={onSubmitPoll} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <OurModal
        isOpen={isSharedDocModalOpen}
        header="Shared documents"
        footer={
          <Button float="right" marginTop="10px" onClick={onSharedDocModalClose}>
            Done
          </Button>
        }
      >
        <SharedDocs trainingId={training.id} sharedDocs={sharedDocs} trainerMode={false} isModal />
      </OurModal>
      <OurModal
        isOpen={isWhiteboardModalOpen}
        onClose={onWhiteboardModalClose}
        header="Shared whiteboard"
      >
        {Whiteboard}
        <Button marginTop="10px" float="right" onClick={onWhiteboardModalClose}>
          Done
        </Button>
      </OurModal>
      <OurModal
        isOpen={isEndedModalOpen}
        header={
          <Flex justifyContent="center">
            {left ? 'You have left the training.' : 'The training is over.'}
          </Flex>
        }
      >
        <Flex justifyContent="center">Thanks for attending!</Flex>
      </OurModal>
      <OurModal header="Leave training?" isOpen={showLeaveModal}>
        <HStack justifyContent="space-around">
          <Button onClick={leaveTraining}>Leave</Button>
          <Button onClick={() => setShowLeaveModal(false)}>Cancel</Button>
        </HStack>
      </OurModal>
      <CamInUseModal code={joinErrorCode} />
      <OurModal header="The training has not yet started" isOpen={!trainingStarted}>
        <VStack alignItems="start" marginLeft="10px">
          <Text marginBottom="15px">
            You will join automatically when it starts or you can return nearer to the scheduled
            time.
          </Text>
          <Text>Scheduled time: {timestampToPrettyTime(training.scheduledTime)}</Text>
          <Text>Trainer: {training.trainerName}</Text>
          <Text>Email: {training.trainerEmail}</Text>
        </VStack>
      </OurModal>
      <OurModal header="The training has ended" isOpen={trainingExpired}>
        <VStack alignItems="start" marginLeft="10px">
          <Text>Scheduled: {timestampToPrettyTime(training.scheduledTime)}</Text>
          <Text>Started: {timestampToPrettyTime(training.startedAt)}</Text>
          <Text>Trainer: {training.trainerName}</Text>
          <Text>Email: {training.trainerEmail}</Text>
        </VStack>
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
