import { Center, Flex, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'

export const BjnMedia = () => {
  const { bjnApi, bjnIsConnected, bjnReceivingScreenShare, bjnParticipants, bjnVideoState } =
    useBlueJeans()
  const [camsOn, setCamsOn] = useState(false)
  const [showMedia, setShowMedia] = useState(false)
  const remoteVideoRef = useRef(null)
  const remoteContentRef = useRef(null)

  useEffect(() => {
    setCamsOn(bjnVideoState === 'ACTIVE')
  }, [bjnVideoState])

  useEffect(() => {
    if (bjnIsConnected) {
      bjnApi.attachRemoteContent(remoteContentRef.current)
      bjnApi.attachRemoteVideo(remoteVideoRef.current)
    }
  }, [bjnIsConnected, bjnApi])

  useEffect(() => {
    const show = (bjnReceivingScreenShare || camsOn) && bjnIsConnected
    setShowMedia(show)
  }, [bjnReceivingScreenShare, camsOn, bjnIsConnected])

  return (
    <Flex h="100%" align="left" background="darkgrey" borderRadius="16px" padding="10px">
      {/* have to keep videos in the dom so the ref doesn't change, so use display: none */}
      <VStack justifyContent="center" height="100%" style={showMedia ? {} : { display: 'none' }}>
        <video ref={remoteContentRef} style={bjnReceivingScreenShare ? {} : { display: 'none' }} />
        <video ref={remoteVideoRef} style={camsOn ? {} : { display: 'none' }} />
      </VStack>

      {!showMedia && (
        <Wrap
          display="flex"
          alignItems="center"
          justifyContent="center"
          justify="center"
          width="100%"
          height="inherit"
        >
          {bjnParticipants.reduce((acc, val, index) => {
            if (val.name) {
              acc.push(
                <WrapItem key={index}>
                  <Center w="120px" h="80px" bg="lightblue" borderRadius="5px">
                    {val.name}
                    {val.isSelf && ' (me)'}
                    {val.isAudioMuted && ' &'}
                  </Center>
                </WrapItem>,
              )
            }
            return acc
          }, [])}
        </Wrap>
      )}
    </Flex>
  )
}
