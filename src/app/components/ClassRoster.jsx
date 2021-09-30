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
import { dummyAttendees } from '../dummyData/dummyAttendees'
import { AttendeeItem } from './AttendeeItem'

export const ClassRoster = ({ attendees, ...props }) => {
  //TODO: After development the dummyAttendees list can be removed and 
  // we can use the attendees list from props as the original one
  const attendeesList = attendees.concat(dummyAttendees)
  const Attendees = useMemo(() => {
    if (attendeesList.length === 0) {
      return [
        <Tr>
          <Td>*None*</Td>
        </Tr>,
      ]
    }

    return attendeesList.map((attendee) => {
      return <AttendeeItem attendeeId={attendee.id} key={attendee.id} />
    })
  }, [attendeesList])

  return (
    <Accordion allowMultiple width="100%" defaultIndex={0} allowToggle>
      <AccordionItem p={0} m={0} border="none">
        <AccordionButton p="2">
          <Box marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
            Attendees
          </Box>
          <AccordionIcon />
        </AccordionButton>
        {/* TODO: Add a custom scrollbar */}
        <AccordionPanel overflowY="auto" maxHeight="55vh" marginTop="2" padding="0" >
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
