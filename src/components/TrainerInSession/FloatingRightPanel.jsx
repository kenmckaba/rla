import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/layout'
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
import { ReactComponent as HandIcon } from '../../assets/icons/hand-icon-3.svg'
import { Tooltip } from '@chakra-ui/react'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'

const IconWrapper = ({ tooltip, children, backgroundColor, ...props }) => (
  <Tooltip
    label={tooltip}
    placement="top"
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
  setAudioMute,
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
  setWebcamMuted,
}) {
  const { bjnApi, bjnVideoMuted, bjnAudioMuted, bjnSharingScreen } = useBlueJeans()
  const activeBgColor = '#bebebe'
  const chatButtonBgColor = chatIsVisible && activeBgColor
  const sharescreenButtonBgColor = bjnSharingScreen && activeBgColor
  const webcamButtonBgColor = !bjnVideoMuted && '#0DC557' || bjnVideoMuted && '#FF4E4E'
  const micButtonBgColor = !bjnAudioMuted && '#0DC557' || bjnAudioMuted && '#FF4E4E'
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
    bjnApi.setVideoMuted(!bjnVideoMuted)
    setWebcamMuted(bjnVideoMuted)
  }

  const handleScreenShare = () => {
    if (bjnSharingScreen) {
      bjnApi.stopScreenShare()
    } else {
      bjnApi.startScreenShare()
    }
  }

  // <Box  p='6' rounded='md' bg='white'>
  return (
    <Collapse in={panelIsVisible} animateOpacity>
      <Flex
        position="fixed"
        top={{
          '2xl': 'calc(99.99vh - 7vh)',
          xl: 'calc(99.99vh - 10vh)',
          md: 'calc(99.99vh - 10vh)',
          sm: 'calc(99.99vh - 10vh)',
        }}
        width={'100%'}
        // left="33%"
        justifyContent={'center'}
        alignItems="center"
        pointerEvents="none">
        <HStack spacing={2}
          justifyContent="center"
          height="fit-content"
          pointerEvents="all">
          <IconWrapper
            boxShadow={'dark-lg'}
            onClick={handleMicMute}
            backgroundColor={micButtonBgColor}
            tooltip="Microphone"
            fill='white'
            _hover={{
              background: 'white',
              fill: '#555',
            }}>
            {!bjnAudioMuted ? (
              <MicIcon style={{ height: '100%', widht: '100%' }} />
            ) : (
              <MicOffIcon style={{ height: '100%', widht: '100%' }} />
            )}
          </IconWrapper>
          <IconWrapper
            boxShadow={'dark-lg'}
            onClick={handleCameraMute}
            backgroundColor={webcamButtonBgColor}
            tooltip="Webcam"
            fill='white'
            _hover={{
              background: 'white',
              fill:'#555'
            }}>
            {!bjnVideoMuted ? (
              <WebcamIcon style={{ height: '100%', widht: '100%' }} />
            ) : (
              <WebcamOffIcon style={{ height: '100%', widht: '100%' }} />
            )}
          </IconWrapper>
          <IconWrapper
            boxShadow={'dark-lg'}
            onClick={handleSettingsModalVisibility} tooltip="Settings">
            <SettingsIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>
          {role === 'instructor' && (
            <IconWrapper
              boxShadow={'dark-lg'}
              onClick={handleScreenShare}
              backgroundColor={sharescreenButtonBgColor}
              tooltip="Share your screen">
              <SharescreenIcon style={{ height: '100%', widht: '100%' }} />
            </IconWrapper>
          )}
          <IconWrapper
            boxShadow={'dark-lg'}
            onClick={handleShareDocumentsModalVisibility}
            tooltip="Shared documents"
            position="relative">
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
                textAlign="center">
                {sharedDocsCount}
              </Box>
            )}
          </IconWrapper>
          <IconWrapper
            boxShadow={'dark-lg'}
            tooltip="Whiteboard" 
            onClick={showWhiteboard}>
            <WhiteboardIcon
              style={{ height: '100%', widht: '100%', marginBottom: '4', marginLeft: '2' }}
            />
          </IconWrapper>

          {role === 'student' && (
            <IconWrapper
              boxShadow={'dark-lg'}
              tooltip="Raise hand"
              backgroundColor={raiseHandBgColor}
              onClick={toggleHand}
            >
              <HandIcon
                // style={{ height: '100%', widht: '100%', marginBottom: '4', marginLeft: '2' }}
              />
            </IconWrapper>
          )}

          <IconWrapper
            boxShadow={'dark-lg'}
            onClick={() => handleChatVisibility()}
            backgroundColor={chatButtonBgColor}
            tooltip="Chat"
          >
            <ChatIcon style={{ height: '100%', widht: '100%', marginTop: '6' }} />
          </IconWrapper>

          <IconWrapper
            boxShadow={'dark-lg'}
            backgroundColor="#FF4E4E"
            onClick={() => handleEndTrainingModalClick()}
            tooltip={role === 'student' ? 'Leave training' : 'End training'}
          >
            <HangupIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>
        </HStack>
      </Flex>
    </Collapse>
  )
}
