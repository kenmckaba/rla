import { Box, Flex, Text } from '@chakra-ui/layout'
import { Collapse } from '@chakra-ui/transition'
import { useEffect, useRef, useState } from 'react'
import { ReactComponent as DoubleArrowRightIcon } from '../assets/icons/double-arrow-right.svg'
import { ReactComponent as DoubleArrowLeftIcon } from '../assets/icons/double-arrow-left.svg'
import { useBlueJeans } from '../bluejeans/useBlueJeans'
import { useMutation, gql } from '@apollo/client'
import { updateAttendee } from '../graphql/mutations'
import { webcamCapture } from '../utils/webcam-capture'

const Header = ({ onDisplayClick, isOpen }) => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"
    height="24px"
    width="100%"
    borderRadius="8px 8px 0 0"
    onClick={onDisplayClick}
    cursor="pointer"
  >
    <Flex justifyContent="space-between">
      <Text fontWeight="bold">My camera</Text>
      <Box marginTop="6px">{isOpen ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}</Box>
    </Flex>
  </Box>
)

export const MyCamera = ({ myAttendeeId }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { bjnApi, bjnVideoMuted } = useBlueJeans()
  const localVideoRef = useRef(null)
  const faceCaptureInterval = useRef(0)
  const [updateCurrentAttendee] = useMutation(gql(updateAttendee))

  useEffect(() => {
    if (myAttendeeId) {
      const stopFaceCapture = () => {
        if (faceCaptureInterval.current) {
          clearInterval(faceCaptureInterval.current)
          faceCaptureInterval.current = 0
        }
      }

      const setFaceStats = async (response, attendeeId) => {
        console.log(response)
        if (response.success) {
          updateCurrentAttendee({
            variables: {
              input: {
                id: myAttendeeId,
                currentMood: Math.round(Math.abs(response.Emotions)),
                posePitch: Math.round(Math.abs(response.Pose.Pitch)),
                poseYaw: Math.round(Math.abs(response.Pose.Yaw)),
                poseRole: Math.round(Math.abs(response.Pose.Roll)),
              },
            },
          })
        }
      }

      const startFaceCapture = () => {
        const grabScreen = async () => {
          const result = await webcamCapture(localVideoRef.current, myAttendeeId)
          if (result) {
            setFaceStats(result)
          }
        }
        if (!faceCaptureInterval.current) {
          faceCaptureInterval.current = setInterval(grabScreen, 2000)
        }
      }

      if (bjnVideoMuted === false) {
        // ignore undefined and null
        startFaceCapture()
      } else {
        stopFaceCapture()
      }
    }
  }, [bjnVideoMuted, myAttendeeId, updateCurrentAttendee])

  useEffect(() => {
    bjnApi.attachLocalVideo(localVideoRef.current)
  }, [bjnApi])

  const collapse = () => {
    setIsOpen(!isOpen)
  }
  // @Ken by changing these values (bottom/right) you can reposition the users camera, 
  //      if needed you can also change those to top/left which could make it easier 
  //      to move depending on the desired position
  return (
    <Box position="absolute" bottom="0.25em" right="28em" width="200px">
      <Header onDisplayClick={collapse} isOpen={isOpen} />

      <Collapse id="coll1" in={isOpen}>
        <video ref={localVideoRef} border-radius="10px" background="lightblue" width="100%" />
      </Collapse>
    </Box>
  )
}
