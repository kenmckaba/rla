import { HStack } from '@chakra-ui/layout'
import React from 'react'
import ParticipantCams from './ParticipantCams'
import { SharescreenPanel } from './PresentPanel/SharescreenPanel'

export default function MiddlePanel() {
  return (
    <HStack spacing="16px">
      <ParticipantCams />
      <SharescreenPanel />
    </HStack>
  )
}
