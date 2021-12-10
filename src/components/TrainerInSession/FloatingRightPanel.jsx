import { Box, Center, Flex, VStack } from '@chakra-ui/layout'
import { Collapse } from '@chakra-ui/transition'
import { ReactComponent as MicIcon } from '../../assets/icons/mic-icon.svg'
import { ReactComponent as MicOffIcon } from '../../assets/icons/mic-off-icon.svg'
import { ReactComponent as WebcamIcon } from '../../assets/icons/webcam-icon.svg'
import { ReactComponent as SharescreenIcon } from '../../assets/icons/sharescreen-icon.svg'
import { ReactComponent as ShareDocumentsIcon } from '../../assets/icons/share-documents-icon.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings-icon.svg'
import { ReactComponent as WhiteboardIcon } from '../../assets/icons/whiteboard-icon.svg'
import { ReactComponent as ChatIcon } from '../../assets/icons/chat-icon.svg'
import { ReactComponent as HangupIcon } from '../../assets/icons/hangup-icon.svg'
import { ReactComponent as WebcamOffIcon } from '../../assets/icons/webcam-off-icon.svg'
import { ReactComponent as HandIcon } from '../../assets/icons/hand-icon-2.svg'
import { Tooltip } from '@chakra-ui/react'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'

const IconWrapper = ({ tooltip, children, backgroundColor, ...props }) => (
  <Tooltip
    label={tooltip}
    placement="left"
    borderRadius="full"
    paddingY="5px"
    paddingX="10px"
    background="rgba(0,0,0,0.7) "
  >
    <Center
      h="48px"
      w="48px"
      borderRadius="full"
      bg={backgroundColor ? backgroundColor : 'rgba(94, 97, 103, 0.75)'}
      _hover={{ cursor: 'pointer' }}
      {...props}
    >
      {children}
    </Center>
  </Tooltip>
)

export default function FloatingRightPanel({
  role, //'instructor' | 'student'
  audioHardMuted,
  videoHardMuted,
  setAudioMute,
  setVideoMute,
  chatIsVisible,
  hoverOnPanel,
  panelIsVisible,
  handleChatVisibility,
  handleSettingsModalVisibility,
  showWhiteboard,
  handleEndTrainingModalClick,
  handleShareDocumentsModalVisibility,
  toggleHand,
  handRaised,
  sharedDocsCount,
}) {
  const { bjnApi, bjnVideoMuted, bjnAudioMuted, bjnSharingScreen } = useBlueJeans()
  const activeBgColor = '#bebebe'
  const chatButtonBgColor = chatIsVisible && activeBgColor
  const sharescreenButtonBgColor = bjnSharingScreen && activeBgColor
  const webcamButtonBgColor = !bjnVideoMuted && '#81272a'
  const micButtonBgColor = !bjnAudioMuted && '#81272a'
  const raiseHandBgColor = handRaised && activeBgColor

  const handleMicMute = () => {
    const muting = !bjnAudioMuted // toggle
    if (muting || role !== 'student' || !audioHardMuted) {
      bjnApi.setAudioMuted(muting)
      if (setAudioMute) {
        setAudioMute(muting)
      }
    }
  }

  const handleCameraMute = () => {
    const muting = !bjnVideoMuted // toggle
    if (muting || role !== 'student' || !videoHardMuted) {
      bjnApi.setVideoMuted(muting)
      if (setVideoMute) {
        setVideoMute(muting)
      }
    }
  }

  const handleScreenShare = () => {
    if (bjnSharingScreen) {
      bjnApi.stopScreenShare()
    } else {
      bjnApi.startScreenShare()
    }
  }

  return (
    <Collapse in={panelIsVisible} animateOpacity>
      <Flex
        position="fixed"
        right="24px"
        top="0"
        height="100%"
        alignItems="center"
        pointerEvents="none"
      >
        <VStack spacing={2} justifyContent="center" height="fit-content" pointerEvents="all">
          <IconWrapper
            onClick={handleMicMute}
            backgroundColor={micButtonBgColor}
            tooltip="Microphone"
          >
            {!bjnAudioMuted ? (
              <MicIcon style={{ height: '100%', widht: '100%' }} />
            ) : (
              <MicOffIcon style={{ height: '100%', widht: '100%' }} />
            )}
          </IconWrapper>

          <IconWrapper
            onClick={handleCameraMute}
            backgroundColor={webcamButtonBgColor}
            tooltip="Webcam"
          >
            {!bjnVideoMuted ? (
              <WebcamIcon style={{ height: '100%', widht: '100%' }} />
            ) : (
              <WebcamOffIcon style={{ height: '100%', widht: '100%' }} />
            )}
          </IconWrapper>

          {role === 'instructor' && (
            <IconWrapper
              onClick={handleScreenShare}
              backgroundColor={sharescreenButtonBgColor}
              tooltip="Share your screen"
            >
              <SharescreenIcon style={{ height: '100%', widht: '100%' }} />
            </IconWrapper>
          )}

          <IconWrapper
            onClick={handleShareDocumentsModalVisibility}
            tooltip="Shared documents"
            position="relative"
          >
            <ShareDocumentsIcon style={{ height: '100%', widht: '100%' }} />
            {!!sharedDocsCount && (
              <Box
                height="18px"
                width="18px"
                background="red"
                borderRadius="9px"
                font-size="13px"
                position="absolute"
                top="24px"
                left="24px"
                paddingTop="1px"
                fontSize="12px"
                textAlign="center"
              >
                {sharedDocsCount}
              </Box>
            )}
          </IconWrapper>

          <IconWrapper onClick={handleSettingsModalVisibility} tooltip="Settings">
            <SettingsIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>

          <IconWrapper tooltip="Whiteboard" onClick={showWhiteboard}>
            <WhiteboardIcon
              style={{ height: '100%', widht: '100%', marginBottom: '4', marginLeft: '2' }}
            />
          </IconWrapper>

          {role === 'student' && (
            <IconWrapper
              tooltip="Raise hand"
              backgroundColor={raiseHandBgColor}
              onClick={toggleHand}
            >
              <HandIcon
                style={{ height: '100%', widht: '100%', marginBottom: '4', marginLeft: '2' }}
              />
            </IconWrapper>
          )}

          <IconWrapper
            onClick={() => handleChatVisibility()}
            backgroundColor={chatButtonBgColor}
            tooltip="Chat"
          >
            <ChatIcon style={{ height: '100%', widht: '100%', marginTop: '6' }} />
          </IconWrapper>

          <IconWrapper
            backgroundColor="#FF4E4E"
            onClick={() => handleEndTrainingModalClick()}
            tooltip={role === 'student' ? 'Leave training' : 'End training'}
          >
            <HangupIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>
        </VStack>
      </Flex>
    </Collapse>
  )
}
