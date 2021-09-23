import {
  Box,
  Table,
  Tbody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tr,
  Td,
  Thead,
  Th,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { AttendeeItem } from './AttendeeItem'

export const ClassRoster = ({ attendees }) => {
  const Attendees = useMemo(() => {
    if (attendees.length === 0) {
      return [
        <Tr>
          <Td>*None*</Td>
        </Tr>,
      ]
    }
    return attendees.map((attendee) => {
      return <AttendeeItem attendeeId={attendee.id} key={attendee.id} />
    })
  }, [attendees])

  return (
    <Accordion allowMultiple width="100%" defaultIndex={0} allowToggle>
      <AccordionItem p={0} m={0} border="none">
        <AccordionButton p="2">
          <Box marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
            Attendees
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel overflowY="scroll" maxH="48" marginTop="4" padding="1" pb={4} >
          <Table size="sm" width="100%" margin="0">
            <Thead borderBottom="2px" borderColor="rgba(255, 255, 255, 0.2)">
              <Tr>
                <Th color="white">Name</Th>
                <Th color="white">Check-in</Th>
                <Th color="white">Notification</Th>
              </Tr>
            </Thead>
            <Tbody>{Attendees}</Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
