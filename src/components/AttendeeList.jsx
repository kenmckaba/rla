import React from 'react'
import {
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Box,
  Button,
  Flex,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, CopyIcon } from '@chakra-ui/icons'

export const AttendeeList = ({ attendees = [], updateAttendee, deleteAttendee }) => {
  const joinAttendee = (e, attendee) => {
    e.stopPropagation()
    window.open(`/attendee/${attendee.id}`)
  }

  const deleteThisAttendee = (e, attendee) => {
    e.stopPropagation()
    deleteAttendee(attendee.id)
  }

  const copyJoinLink = (e, attendee) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/attendee/${attendee.id}`)
  }

  return (
    <Box borderRadius="6px" borderWidth="1px" borderColor="gray.200" mt="3">
      <Flex marginLeft="12px" marginTop="3px" justifyContent="space-between">
        <Box fontWeight="500" fontSize="sm">
          Attendees
        </Box>
        <Button
          size="xs"
          marginRight="3px"
          rightIcon={<AddIcon />}
          variant="outline"
          onClick={() => updateAttendee()}
        >
          Add an attendee
        </Button>
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
              Name
            </Th>
            <Th pb="0">Attended</Th>
            <Th pn="0"></Th>
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
                <Tr key={attendee.id} cursor="pointer" onClick={() => updateAttendee(attendee)}>
                  <Td fontSize="12" paddingLeft="16px">
                    {attendee.name}
                  </Td>
                  <Td fontSize="12" paddingLeft="16px">
                    {attendee.joinedTime ? '✅' : ''}
                  </Td>
                  <Td fontSize="12" padding="0">
                    <IconButton
                      icon={<DeleteIcon />}
                      color="lightslategray"
                      background="white"
                      float="right"
                      size="xs"
                      height="14px"
                      onClick={(e) => deleteThisAttendee(e, attendee)}
                    />
                  </Td>
                  <Td fontSize="12" padding="0">
                    <Tooltip label="Copy student's join link">
                      <IconButton
                        icon={<CopyIcon />}
                        color="lightslategray"
                        background="white"
                        float="right"
                        size="xs"
                        height="14px"
                        onClick={(e) => copyJoinLink(e, attendee)}
                      />
                    </Tooltip>
                  </Td>
                  <Td fontSize="12" paddingLeft="16px">
                    <Button
                      variant="outline"
                      float="right"
                      color="lightslategray"
                      size="xs"
                      height="14px"
                      onClick={(e) => joinAttendee(e, attendee)}
                    >
                      Join
                    </Button>
                  </Td>
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>
    </Box>
  )
}
