import React from 'react'
import { Table, Tr, Th, Td, Tbody, Thead, Box, Button, Flex } from '@chakra-ui/react'

export const AttendeeList = ({ onClickName, attendees = [] }) => {
  const joinAttendee = (e, attendee) => {
    e.stopPropagation()
    window.open(`/attendee/${attendee.id}`)
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Completed</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {attendees.length === 0 ? (
          <Tr>
            <Td>*None*</Td>
          </Tr>
        ) : (
          attendees.map((attendee) => {
            return (
              <Tr key={attendee.id} cursor="pointer">
                <Td fontSize="12" onClick={() => onClickName(attendee)}>{attendee.name}</Td>
                <Td fontSize="12">{attendee.joinedTime ? '✅' : ''}</Td>
                <Td fontSize="12">
                  <Button
                    variant="outline"
                    float="right"
                    color="lightslategray"
                    size="xs"
                    height="14px"
                    onClick={(e) => joinAttendee(e, attendee)}
                  >
                    Send LInk
                  </Button>
                </Td>
              </Tr>
            )
          })
        )}
      </Tbody>
    </Table>
  )
}
