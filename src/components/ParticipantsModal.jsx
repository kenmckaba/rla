import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { useState } from 'react'
import AddAttendeeModal from './AddAttendeeModal'

const AttendeeItem = ({ attendee }) => (
  <HStack>
    <Avatar
      key={attendee.id}
      size="md"
      name={attendee.name}
      color="white"
      bg="#0D62C5"
    />

    <VStack spacing="0">
      <Text color="#444444" fontSize="2xl" height="28px">
        {attendee.name}
      </Text>

      <Text height="18px">
        {attendee.email}
      </Text>

    </VStack>
  </HStack>
)

export default function ParticipantsModal({ isOpen, onClose, training }) {
  const [showAddAttendeeModal, setShowAddAttendeeModal] = useState(false)
  const trainingId = training?.id
  const attendees = training?.attendees?.items || []

  return (
    <>
      <Modal variant="primary-transparent" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent paddingBottom="8" paddingTop="4">
          <ModalHeader color="darkKnight.700">
            {`${attendees.length} ${attendees.length === 1 ? 'Participant' : 'Participants'}`}
          </ModalHeader>
          <ModalBody color="darkKnight.700" >
            <VStack align="flex-start" spacing="8" marginBottom="8">
              {attendees.map(attendee => <AttendeeItem attendee={attendee} />)}
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
        trainingId={trainingId}
        onAttendeeClose={() => setShowAddAttendeeModal(false)}
      />
    </>
  )
}
