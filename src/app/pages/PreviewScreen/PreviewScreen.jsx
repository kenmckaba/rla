//import React, { useEffect, useMemo, useRef } from 'react'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Icon,
  Flex,
  Container,
  useDisclosure,
} from '@chakra-ui/react'
import { EditButton, PrimaryButton } from '../../components/shared/Buttons'
import { useState } from 'react'
import { FaCamera, FaMicrophone, FaVideo } from 'react-icons/fa'
import { H1Heading, H3Heading } from '../../components/shared/Heading'
import './PreviewScreen.css'

export const PreviewScreen = ({
  match: {
    params: { trainingId },
  },
}) => {
  // const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  // const onSettings = () => {
  //   onModalOpen()
  // }
  const [toggleControlCam, setToggleControlCam] = useState(false)
  const toggleControlButtonCam = () => {
    setToggleControlCam(!toggleControlCam)
  }
  const [toggleControlMic, setToggleControlMic] = useState(false)
  const toggleControlButtonMic = () => {
    setToggleControlMic(!toggleControlMic)
  }
  return (
    <>
      <Container maxW="container.xl" maxWidth="unset">
        <Flex
          height="100%"
          minHeight="100vh"
          padding="2em"
          flexDirection="column"
          justifyContent="center"
          pos="relative"
          overflow="hidden"
        >
          <Box pos="absolute" top="8" left="8">
            <H3Heading>
              Remote Learning Platform
            </H3Heading>
          </Box>
          <Flex flexDirection="column" w="100%" alignItems="center" justifyContent="center">
            <H1Heading style={{textAlign: 'center'}}>
              Hello Ken.<br></br>Let’s check out the camera and mic
            </H1Heading>
            <div className={`${toggleControlCam ? 'preview-screen toggle-screen' : 'preview-screen'}`}>
              <EditButton w="30%" h="12%" className="preview-settings">
                Settings
              </EditButton>
              <div className="preview-controls">
                <Icon as={FaVideo} onClick={() => toggleControlButtonCam(!toggleControlCam)} className={`${toggleControlCam ? 'preview-cam toggle-control-cam' : 'preview-cam'}`}/>
                <Icon as={FaMicrophone} onClick={() => toggleControlButtonMic(!toggleControlMic)} className={`${toggleControlMic ? 'preview-mic toggle-control-mic' : 'preview-mic'}`}/>
              </div>
            </div>
            <Flex flexDirection="row" w="100%" alignItems="center" justifyContent="center">
              <EditButton w="15%" className='remove-icon-from-button'>
                Go Back
              </EditButton>
              <PrimaryButton w="15%" style={{marginLeft: '20px'}}>
                Start training
              </PrimaryButton>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
