import { Center, Flex, VStack, Wrap, WrapItem, Select, Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useBlueJeans } from '../bluejeans/useBlueJeans'
import { MyCamera } from './MyCamera'
import './bjn-media.css'

const calcVideoSize = (count) => {
  switch (count) {
  case 1:
    return '100%'
  case 2:
  case 3:
  case 4:
    return '50%'
  case 5:
  case 6:
  case 7:
  case 8:
  case 9:
    return '33.33%'
  default:
    return '25%'
  }
}

const findVids = (remoteVideoDiv) => {
  console.log('trackVideoSizes remoteVideoDiv', remoteVideoDiv)
  const videosElems = remoteVideoDiv.querySelectorAll('[class^="ThumbnailVideo"]')
  console.log('trackVideoSizes children', videosElems.length)
  const newSize = calcVideoSize(videosElems.length)
  console.log('trackVideoSizes vids.length', videosElems.length, newSize)
  videosElems.forEach((vid) => {
    vid.style.height = newSize
    vid.style.width = newSize
  })
}

let lastDivObserver

const trackVideoSizes = (remoteVideoDiv) => {
  console.log('trackVideoSizes', remoteVideoDiv)
  if (lastDivObserver) {
    lastDivObserver.disconnect()
    lastDivObserver = null
  }
  findVids(remoteVideoDiv)
  var observer = new MutationObserver((mutations) => {
    console.log('trackVideoSizes mutations', mutations)
    findVids(remoteVideoDiv)
  })
  observer.observe(remoteVideoDiv, { childList: true, subtree: true })
  lastDivObserver = observer
}

export const BjnMedia = ({ shareWebcam, myAttendeeId, marginLeft, marginRight, training }) => {
  const {
    bjnApi,
    bjnIsConnected,
    bjnReceivingScreenShare,
    bjnParticipants,
    bjnVideoState,
    bjnVideoLayout,
  } = useBlueJeans()
  const [camsOn, setCamsOn] = useState(true)
  const [lastVideoLayout, setLastVideoLayout] = useState('GALLERY')
  const [showMedia, setShowMedia] = useState(true)
  const remoteVideoRef = useRef(null)
  const remoteContentRef = useRef(null)

  useEffect(() => {
    setCamsOn(bjnVideoState === 'ACTIVE')
  }, [bjnVideoState])

  useEffect(() => {
    if (bjnIsConnected) {
      bjnApi.attachRemoteContent(remoteContentRef.current)
      bjnApi.attachRemoteVideo(remoteVideoRef.current)
      trackVideoSizes(remoteVideoRef.current)
    }
    return () => {
      if (lastDivObserver) {
        lastDivObserver.disconnect()
      }
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

  // const setLayout = (e) => {
  //   setLastVideoLayout(e.target.value)
  //   bjnApi.setVideoLayout(e.target.value)
  // }

  return (
    <Flex
      width="100%"
      height="95.5vh"
      background="#396AA1"
      borderRadius="16px"
      justifyContent="center"
      mt={[0, '1vh !important']}
      ml={marginLeft ? [0, '0.5vw !important'] : ''}
      mr={marginRight ? [0, '0.5vw !important'] : ''}
    >
      {training && (
        <Box
          position="absolute"
          width="100%"
          transition="0.3s"
          _hover={{ backgroundColor: 'transparent', color: 'transparent' }}
        >
          <Center fontSize="20px" mb={'-2'}>
            {training.title}
          </Center>
          <Center>{training.description}</Center>
        </Box>
      )}
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
        <div
          ref={remoteVideoRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
          }}
        />
        {/* {camsOn && !bjnReceivingScreenShare && (
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
        )} */}
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
