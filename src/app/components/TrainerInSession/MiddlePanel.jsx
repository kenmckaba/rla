import { VStack } from '@chakra-ui/layout'
import React from 'react'
import ParticipantCamsRow from './ParticipantCams/ParticipantCamsRow'
import ParticipantCamsGrid from './ParticipantCamsGrid'
import Sharescreen from './RightPanel/Sharescreen'


export default function MiddlePanel({ shareScreenLayout, ...props }) {
  return (
    <>
      {
        shareScreenLayout ? (
          <VStack height="100vh" paddingY="4" marginRight="4" flex="5" >
            <Sharescreen flexGrow="5" />
            <ParticipantCamsRow flex="1 1 16.6666%" flexGrow="1" {...props} />
          </VStack>
        ) : <ParticipantCamsGrid {...props} />
      }
    </>
  )
}
