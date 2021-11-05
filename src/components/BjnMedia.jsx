import { Center, Flex, VStack, Wrap, WrapItem, Select } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useBlueJeans } from '../bluejeans/useBlueJeans'
import { MyCamera } from './MyCamera'

export const BjnMedia = ({ shareWebcam, myAttendeeId }) => {
  const {
    bjnApi,
    bjnIsConnected,
    bjnReceivingScreenShare,
    bjnParticipants,
    bjnVideoState,
    bjnVideoLayout,
  } = useBlueJeans()
  const [camsOn, setCamsOn] = useState(false)
  const [lastVideoLayout, setLastVideoLayout] = useState('GALLERY')
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

  useEffect(() => {
    if (camsOn && bjnReceivingScreenShare) {
      bjnApi.setVideoLayout('FILMSTRIP')
    }
    if (!bjnReceivingScreenShare) {
      bjnApi.setVideoLayout(lastVideoLayout)
    }
  }, [bjnReceivingScreenShare, camsOn, bjnApi, lastVideoLayout])

  const setLayout = (e) => {
    setLastVideoLayout(e.target.value)
    bjnApi.setVideoLayout(e.target.value)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      background="#396AA1"
      borderRadius="16px"
      padding="10px"
      justifyContent="center"
      position="relative"
    >
      {/* have to keep videos in the dom so the ref doesn't change, so use display: none */}
      <VStack
        justifyContent="center"
        height="100%"
        width="100%"
        position="relative"
        style={showMedia ? {} : { display: 'none' }}
      >
        <video
          ref={remoteContentRef}
          style={
            bjnReceivingScreenShare
              ? {
                width: '100%',
                height: camsOn ? '85%' : '100%',
                'object-fit': 'contain',
                position: 'absolute',
                top: 0,
              }
              : { display: 'none' }
          }
        />
        <video
          ref={remoteVideoRef}
          style={
            camsOn
              ? {
                width: '100%',
                'object-fit': 'contain',
                'clip-path': bjnReceivingScreenShare ? 'inset(86% 0 0)' : 'none',
                position: bjnReceivingScreenShare ? 'absolute' : 'relative',
                bottom: 0,
              }
              : { display: 'none' }
          }
        />
        {camsOn && !bjnReceivingScreenShare && (
          <Select
            size="xs"
            onChange={setLayout}
            value={bjnVideoLayout || ''}
            position="absolute"
            bottom="10px"
            left="10px"
            opacity="0.7"
            width="100px"
            color="darkKnight.700"
            backgroundColor="grey"
          >
            {['GALLERY', 'PEOPLE', 'SPEAKER'].map((layout, index) => {
              return <option key={index}>{layout}</option>
            })}
          </Select>
        )}
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
                  <Center w="120px" h="80px" bg="blue.700" borderRadius="5px" color="white">
                    {val.name}
                    {val.isSelf && ' (me)'}
                    {/* {val.isAudioMuted && ' &'} */}
                  </Center>
                </WrapItem>,
              )
            }
            return acc
          }, [])}
        </Wrap>
      )}
      {shareWebcam && <MyCamera myAttendeeId={myAttendeeId} />}
    </Flex>
  )
}
