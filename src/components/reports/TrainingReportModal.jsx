import { Button, HStack, Text, Table, Thead, Tr, Td, Th, Tbody, Heading } from '@chakra-ui/react'
import OurModal from '../OurModal'
import { trainingCsv, dateTimeOutput, timeOutput, duration } from './trainingCsv'

export const TrainingReportModal = ({ training, isOpen, onClose }) => {
  const footer = (
    <HStack justifyContent="space-between" width="100%">
      <Button onClick={() => trainingCsv(training)} variant="outline">
        Download CSV
      </Button>
      <Button onClick={onClose}>Close</Button>
    </HStack>
  )

  const Entry = ({ label, children }) => {
    return (
      <HStack>
        <Heading textTransform="uppercase" fontSize="14px">
          {label}{' '}
        </Heading>
        <Text fontSize="14px">{children || '-'}</Text>
      </HStack>
    )
  }

  return (
    <OurModal size="xl" isOpen={isOpen && training} header="Training report" footer={footer}>
      {training && (
        <>
          <Entry label="Title:">{training.title}</Entry>
          <Entry label="Description:">{training.description}</Entry>
          <HStack>
            <Entry label="Trainer:">{training.trainerName}</Entry>
            <Entry label="Email:">{training.trainerEmail}</Entry>
          </HStack>
          <Entry label="Scheduled:">{dateTimeOutput(training.scheduledTime)}</Entry>
          <HStack>
            <Entry label="Started:">{dateTimeOutput(training.startedAt)}</Entry>
            <Entry label="Ended:">{dateTimeOutput(training.endedAt)}</Entry>
          </HStack>
          <Entry label="Duration:">{duration(training.startedAt, training.endedAt)}</Entry>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th padding="4px">Name</Th>
                <Th padding="4px">Email</Th>
                <Th padding="4px">Joined</Th>
                <Th padding="4px">Left</Th>
                <Th padding="4px">Duration</Th>
              </Tr>
            </Thead>
            <Tbody>
              {training.attendees.items.map((att, index) => {
                return (
                  <Tr key={index}>
                    <Td padding="4px" fontSize="12px">
                      {att.name}
                    </Td>
                    <Td padding="4px">{att.email}</Td>
                    <Td padding="4px" fontSize="12px">
                      {timeOutput(att.joinedTime)}
                    </Td>
                    <Td padding="4px" fontSize="12px">
                      {timeOutput(att.leftTime)}
                    </Td>
                    <Td padding="4px" fontSize="12px">
                      {duration(att.joinedTime, att.leftTime)}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </>
      )}
    </OurModal>
  )
}
