import { Box } from '@chakra-ui/layout'
import { Collapse, Slide } from '@chakra-ui/transition'
import React, { useState } from 'react'

export default function FloatingRightPanel() {
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)
  return (
    <Box
      height="100%"
      width="112px"
      position="fixed"
      right="0"
      top="0"
      onMouseEnter={() => {
        console.log(!showFloatingPanel)
        setShowFloatingPanel(true)
      }}
      onMouseLeave={() => {
        console.log(!showFloatingPanel)
        setShowFloatingPanel(false)
      }}
      style={{ zIndex: 3 }}
    >
      <Collapse in={showFloatingPanel} animateOpacity>
        <Box
          position="fixed"
          right="0"
          top="0"
          width="112px"
          height="100%"
          bg="red"
          style={{ zIndex: 2 }}>debug</Box>

      </Collapse>
    </Box>
  
  )}
