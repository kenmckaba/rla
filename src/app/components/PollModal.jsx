import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody } from '@chakra-ui/react'
import { PollForm } from './PollForm'

export const PollModal = ({ poll, isOpen, trainingId, onClose }) => {
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent color="darkKnight.700">
        <ModalHeader>{poll ? 'Poll' : 'New poll'}</ModalHeader>
        <ModalBody>
          <PollForm trainingId={trainingId} poll={poll} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
