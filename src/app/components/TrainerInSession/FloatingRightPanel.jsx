import { Box, Center, VStack } from '@chakra-ui/layout'
import { Collapse } from '@chakra-ui/transition'
import React, { useState } from 'react'
import { ReactComponent as MicIcon } from '../../../assets/icons/mic-icon.svg'
import { ReactComponent as WebcamIcon } from '../../../assets/icons/webcam-icon.svg'
import { ReactComponent as SharescreenIcon } from '../../../assets/icons/sharescreen-icon.svg'
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings-icon.svg'
import { ReactComponent as WhiteboardIcon } from '../../../assets/icons/whiteboard-icon.svg'
import { ReactComponent as ChatIcon } from '../../../assets/icons/chat-icon.svg'
import { ReactComponent as HangupIcon } from '../../../assets/icons/hangup-icon.svg'

const IconWrapper = ({ children, backgroundColor, ...props }) => (
  <Center
    h="48px"
    w="48px"
    borderRadius="full"
    bg={backgroundColor ? backgroundColor : 'rgba(94, 97, 103, 0.75)'}
    _hover={{ cursor: 'pointer' }}
    {...props}
  >
    {children}
  </Center>)

export default function FloatingRightPanel({
  handleChatVisibility, 
  handleShareScreenVisibility, 
  handleSettingsModalVisibility
}) {
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)
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
          <IconWrapper>
            <MicIcon style={{height:'100%', widht:'100%'}} />
          </IconWrapper>

          <IconWrapper>
            <WebcamIcon style={{height:'100%', widht:'100%'}} />
          </IconWrapper>
      
          <IconWrapper onClick={() => handleShareScreenVisibility()}>
            <SharescreenIcon style={{height:'100%', widht:'100%'}} />
          </IconWrapper>

          <IconWrapper onClick={() => handleSettingsModalVisibility()}>
            <SettingsIcon style={{height:'100%', widht:'100%'}} />
          </IconWrapper>

          <IconWrapper>
            <WhiteboardIcon style={{height:'100%', widht:'100%', marginBottom: '4', marginLeft: '2'}} />
          </IconWrapper>

          <IconWrapper onClick={() => handleChatVisibility()}>
            <ChatIcon style={{height:'100%', widht:'100%', marginTop: '6'}} />
          </IconWrapper>

          <IconWrapper backgroundColor="#FF4E4E">
            <HangupIcon style={{height:'100%', widht:'100%'}} />
          </IconWrapper>
        </VStack>

      </Collapse>
    </Box>

  )
}
