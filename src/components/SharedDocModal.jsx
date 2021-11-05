import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody } from '@chakra-ui/react'
import { SharedDocForm } from './SharedDocForm'

export const SharedDocModal = ({ sharedDoc, isOpen, trainingId, onClose }) => {
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent color="darkKnight.700">
        <ModalHeader>{sharedDoc ? 'Edit Document' : 'New Document'}</ModalHeader>
        <ModalBody>
          <SharedDocForm trainingId={trainingId} sharedDoc={sharedDoc} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
