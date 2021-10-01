import { Center, VStack } from '@chakra-ui/layout'
import React from 'react'
import ParticipantCamsRow from './ParticipantCams/ParticipantCamsRow'
import ParticipantCamsGrid from './ParticipantCamsGrid'
import Sharescreen from './RightPanel/Sharescreen'


export default function MiddlePanel({
  isStudentView,
  shareScreenLayout,
  handleShareScreenVisibility,
  chatIsVisible,
  onNextCamClick,
  onPrevCamClick,
  ...props
}) {
  return (
    <>
      {
        shareScreenLayout ? (
          <VStack height="100vh" paddingY="4" flex="5" >
            <Sharescreen flexGrow="5" handleShareScreenVisibility={handleShareScreenVisibility} />
            <ParticipantCamsRow flex="1 1 16.6666%" flexGrow="1" {...props} />
          </VStack>
        ) : <Center maxHeight="98vh" width="86%" paddingY="4" marginLeft="4">
          <ParticipantCamsGrid isStudentView={isStudentView} onNextCamClick={onNextCamClick} onPrevCamClick={onNextCamClick} chatIsVisible={chatIsVisible} {...props} />
        </Center>
      }
    </>
  )
}
