import { Box, Center, VStack } from '@chakra-ui/layout'
import { Collapse } from '@chakra-ui/transition'
import React, { useState } from 'react'
import { ReactComponent as MicIcon } from '../../../assets/icons/mic-icon.svg'
import { ReactComponent as MicOffIcon } from '../../../assets/icons/mic-off-icon.svg'
import { ReactComponent as WebcamIcon } from '../../../assets/icons/webcam-icon.svg'
import { ReactComponent as SharescreenIcon } from '../../../assets/icons/sharescreen-icon.svg'
import { ReactComponent as ShareDocumentsIcon } from '../../../assets/icons/share-documents-icon.svg'
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings-icon.svg'
import { ReactComponent as WhiteboardIcon } from '../../../assets/icons/whiteboard-icon.svg'
import { ReactComponent as ChatIcon } from '../../../assets/icons/chat-icon.svg'
import { ReactComponent as HangupIcon } from '../../../assets/icons/hangup-icon.svg'
import { ReactComponent as WebcamOffIcon } from '../../../assets/icons/webcam-off-icon.svg'
import { ReactComponent as HandIcon } from '../../../assets/icons/hand-icon-2.svg'
import { Tooltip } from '@chakra-ui/react'

const IconWrapper = ({ tooltip, children, backgroundColor, ...props }) => (
  <Tooltip label={tooltip} placement="left" borderRadius="full" paddingY="5px" paddingX="10px" background="rgba(0,0,0,0.7) ">
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
  chatIsVisible,
  shareScreenIsVisible,
  webcamIsVisible,
  micIsVisible,
  handleMicVisibility,
  handleWebcamVisibility,
  handleChatVisibility,
  handleShareScreenVisibility,
  handleSettingsModalVisibility,
  handleEndTrainingModalClick,
  handleShareDocumentsModalVisibility
}) {
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)
  const activeBgColor = '#bebebe'
  const chatButtonBgColor = chatIsVisible && activeBgColor
  const sharescreenButtonBgColor = shareScreenIsVisible && activeBgColor
  const webcamButtonBgColor = !webcamIsVisible && '#81272a'
  const micButtonBgColor = !micIsVisible && '#81272a'

  return (
    <Box
      height="30%"
      width="112px"
      position="absolute"
      right="0"
      top="25%"
      onMouseEnter={() => setShowFloatingPanel(true)}
      onMouseLeave={() => setShowFloatingPanel(false)}
    >
      <Collapse in={showFloatingPanel} animateOpacity>
        <VStack
          position="fixed"
          right="0"
          top="0"
          width="112px"
          height="100%"
          spacing={2}
          justifyContent="center"
        >
          <IconWrapper
            onClick={() => handleMicVisibility()}
            backgroundColor={micButtonBgColor}
            tooltip="Microphone"
          >
            {micIsVisible ? (
              <MicIcon style={{ height: '100%', widht: '100%' }} />
            ) : (
              <MicOffIcon style={{ height: '100%', widht: '100%' }} />
            )}
          </IconWrapper>

          <IconWrapper
            onClick={() => handleWebcamVisibility()}
            backgroundColor={webcamButtonBgColor}
            tooltip="Webcam">
            {webcamIsVisible ? (
              <WebcamIcon style={{ height: '100%', widht: '100%' }} />
            ) : (
              <WebcamOffIcon style={{ height: '100%', widht: '100%' }} />
            )}
          </IconWrapper>

          {role === 'instructor' &&
            <IconWrapper
              onClick={() => handleShareScreenVisibility()}
              backgroundColor={sharescreenButtonBgColor}
              tooltip="Sharescreen">
              <SharescreenIcon style={{ height: '100%', widht: '100%' }} />
            </IconWrapper>}

          <IconWrapper
            onClick={() => handleShareDocumentsModalVisibility()}
            tooltip="Share documents">
            <ShareDocumentsIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>

          <IconWrapper
            onClick={() => handleSettingsModalVisibility()}
            tooltip="Settings"
          >
            <SettingsIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>

          <IconWrapper tooltip="Whiteboard">
            <WhiteboardIcon style={{ height: '100%', widht: '100%', marginBottom: '4', marginLeft: '2' }} />
          </IconWrapper>

          {role === 'student' &&
            <IconWrapper tooltip="Raise hand">
              <HandIcon style={{ height: '100%', widht: '100%', marginBottom: '4', marginLeft: '2' }} />
            </IconWrapper>
          }

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
            tooltip="End training"
          >
            <HangupIcon style={{ height: '100%', widht: '100%' }} />
          </IconWrapper>
        </VStack>

      </Collapse>
    </Box>

  )
}
