import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody } from '@chakra-ui/react'
import { TrainerWhiteboard } from './TrainerWhiteboard'

export const WhiteboardModal = ({ whiteboard, shared, isOpen, trainingId, onClose }) => {
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent color="darkKnight.700">
        <ModalHeader>Shared whiteboard</ModalHeader>
        <ModalBody>
          <TrainerWhiteboard
            trainingId={trainingId}
            url={whiteboard}
            shared={shared}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
