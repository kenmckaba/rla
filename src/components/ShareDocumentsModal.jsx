import {
  Flex,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { SharedDocs } from './SharedDocs'

export default function ShareDocumentsModal({ docs, trainingId, isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" width="448px" isCentered>
        <ModalOverlay />
        <ModalContent color="darkKnight.700">
          <ModalHeader>
            <Flex color="black" justifyContent="flex-start">
              Shared documents
            </Flex>
          </ModalHeader>
          <ModalBody>
            <SharedDocs trainingId={trainingId} sharedDocs={docs} trainerMode={true} isModal />
            <Button variant="primary-trueblue" onClick={onClose} marginTop="5px" float="right">
              <Text textTransform="capitalize">Done</Text>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
