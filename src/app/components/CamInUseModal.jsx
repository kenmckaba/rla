import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
} from '@chakra-ui/react'

export const CamInUseModal = ({ code }) => {
  const message = () => {
    if (code === 6004) {
      return <Center>Your camera is in use by another app.</Center>
    } else if (code === 6005) {
      return <Center>Access to your microphone and camera was denied.</Center>
    } else {
      return <Center>Unknown BlueJeans error</Center>
    }
  }

  const instructions = () => {
    if (code === 6004) {
      return (
        <Center>
          Please close the app or release the microphone and camera and refresh this page.
        </Center>
      )
    } else if (code === 6005) {
      return <Center>Please allow access to your microphone &amp; camera.</Center>
    } else {
      return <Center>BlueJeans error code: {code}</Center>
    }
  }

  return (
    <Modal isOpen={!!code} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent height="300px">
        <ModalHeader>
          <VStack>
            <Center>Join error:</Center>
            {message()}
          </VStack>
        </ModalHeader>
        <ModalBody>{instructions()}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
