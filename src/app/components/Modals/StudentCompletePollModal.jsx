import { Flex, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'

export default function StudentCompletePollModal({ isOpen, onClose }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" width="448px" isCentered>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader paddingBottom="0" fontWeight="semibold">
          <Flex color="black" justifyContent="flex-start">Poll submitted</Flex>
        </ModalHeader>
        <ModalBody paddingTop="0">
          <VStack align="start" spacing="4" paddingBottom="2">
            <Text fontWeight="semibold" color="black">Thanks for your response!</Text>
            <Button width="100%" variant="primary-trueblue" onClick={onClose}>
              <Text textTransform="capitalize">Continue Training</Text>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
