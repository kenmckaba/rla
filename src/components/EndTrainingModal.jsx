import { Flex, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Button } from '@chakra-ui/react'

export default function EndTrainingModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" width="448px" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingBottom="0" fontWeight="semibold">
          <Flex color="black" justifyContent="flex-start">
            The training is over.
          </Flex>
        </ModalHeader>
        <ModalBody paddingTop="0">
          <VStack align="start" spacing="4" paddingBottom="2">
            <Text fontWeight="semibold" color="black">
              Thank you for attending!
            </Text>
            <Button width="100%" variant="primary-trueblue" onClick={onClose}>
              <Text textTransform="capitalize">Return to Homepage</Text>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
