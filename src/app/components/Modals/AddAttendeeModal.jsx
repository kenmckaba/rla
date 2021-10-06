import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { AttendeeForm } from '../AttendeeForm'

export default function AddAttendeeModal({isOpen, currentAttendee, trainingId, onAttendeeClose}) {
  return (
    <Modal variant="primary-transparent" isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="darkKnight.700">
          {currentAttendee ? 'Attendee' : 'New Attendee'}
        </ModalHeader>
        <ModalBody color="darkKnight.700">
          <AttendeeForm
            trainingId={trainingId}
            onClose={onAttendeeClose}
            attendee={currentAttendee}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
