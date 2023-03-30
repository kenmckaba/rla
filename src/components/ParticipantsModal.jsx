import {
  Avatar,
  Button,
  HStack,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'
import AddAttendeeModal from './AddAttendeeModal'

const AttendeeItem = ({ attendee }) => (
  <HStack>
    <Avatar key={attendee.id} size="md" name={attendee.name} color="white" bg="#0D62C5" />

    <VStack spacing="0">
      <Text color="#444444" fontSize="2xl" height="28px">
        {attendee.name}
      </Text>

      <Text height="18px">{attendee.email}</Text>
    </VStack>
  </HStack>
)

export default function ParticipantsModal({ isOpen, onClose, training }) {
  const [showAddAttendeeModal, setShowAddAttendeeModal] = useState(false)
  const attendees = training?.attendees?.items || []

  return (
    <>
      <Modal
        variant="primary-transparent"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent paddingBottom="8" paddingTop="4">
          <ModalHeader color="darkKnight.700">
            {`${attendees.length} ${attendees.length === 1 ? 'Participant' : 'Participants'}`}
          </ModalHeader>
          <ModalBody color="darkKnight.700">
            <VStack align="flex-start" spacing="8" marginBottom="8">
              {attendees.map((attendee) => (
                <AttendeeItem key={attendee.id} attendee={attendee} />
              ))}
            </VStack>
            <Button
              size="sm"
              variant="primary-trueblue"
              onClick={() => setShowAddAttendeeModal(true)}
            >
              + add attendee
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AddAttendeeModal
        isOpen={showAddAttendeeModal}
        training={training}
        onAttendeeClose={() => setShowAddAttendeeModal(false)}
      />
    </>
  )
}
