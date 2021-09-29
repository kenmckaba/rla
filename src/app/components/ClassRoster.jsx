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

export const ClassRoster = ({ attendees, ...props }) => {
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
        <AccordionPanel overflowY="scroll" h="55vh" marginTop="2" padding="0" >
          <Table size="sm" width="100%" margin="0">
            <Thead borderBottom="1px" borderColor="#ffffff">
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
