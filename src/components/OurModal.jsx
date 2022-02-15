import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'

export default function OurModal({ isOpen, onAttendeeClose, header, footer, size, children }) {
  return (
    <Modal size={size} variant="primary-transparent" isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent color="darkKnight.700">
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
