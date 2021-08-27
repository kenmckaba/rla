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
      <AccordionItem border="none">
        <AccordionButton padding="0px">
          <Box flex="1" textAlign="left" fontWeight="bold">
            Class roster
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel padding="0" pb={4}>
          <Table size="sm" width="100%" margin="0">
            <Tbody>{Attendees}</Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
